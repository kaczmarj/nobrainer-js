// Module for using a trained TensorFlow model for two-dimensional semantic segmentation.

import * as tf from '@tensorflow/tfjs';

// Normalize data in a `tf.Tensor` to range `[0, 1]`.
//   Equivalent to `(x - min(x)) / (max(x) - min(x))`.
function minMaxNorm<T extends tf.Tensor>(x: T): T {
  return tf.tidy(() => {
    const m = x.min();
    return x.sub(m).div(x.max().sub(m));
  });
}

// Normalize data in a `tf.Tensor` to zero mean and unit standard deviation.
// https://github.com/tensorflow/tfjs-models/blob/069c90c563d12a582b2c4228a3b30722b0811f23/speech-commands/
//   utils/util.ts#L75-L85
function zscore<T extends tf.Tensor>(x: T): T {
  return tf.tidy(() => {
    const mean = tf.mean(x);
    const std = tf.sqrt(tf.mean(tf.square(tf.add(x, tf.neg(mean)))));
    return tf.div(tf.add(x, tf.neg(mean)), std);
  });
}

// Predict on images using a trained tfjs model.
export function predict(
  modelPath: string,
  pixels: ImageData,
  nChannels: number,
  normalizer?: 'minmax' | 'zscore',
  canvas?: HTMLCanvasElement,
): Promise<Uint8ClampedArray | void> {
  const model: Promise<tf.Model> = tf.loadModel(modelPath);

  return model
    .then(m => {
      // Get images.
      // Rank 3: (x, y, channels).
      // TODO: get stack of axial images.
      let image: tf.Tensor3D = tf.fromPixels(pixels, nChannels);
      image = image.toFloat();

      const originalWidth = image.shape[0];
      const originalHeight = image.shape[1];

      // Rank 4: (batch, x, y, channels).
      let features: tf.Tensor4D = tf.expandDims(image, 0);

      // Resize to common shape.
      const imageShape: [number, number] = [256, 256];
      // features.resizeBilinear(imageShape);
      features = tf.image.resizeNearestNeighbor(features, imageShape);

      // Normalize features.
      if (normalizer !== null) {
        if (normalizer === 'minmax') {
          features = minMaxNorm(features);
        } else if (normalizer === 'zscore') {
          features = zscore(features);
        }
      }

      // Predict.
      const probabilities = m.predict(features) as tf.Tensor4D;

      // Get dense volume of predictions.
      const cutoff: tf.Scalar = tf.scalar(0.5, 'float32');

      // Convert probabilities to hard class IDs.
      // Rank 3: (batch, x, y).
      // TODO: this should be an argmax in the future.
      let classes: tf.Tensor3D = probabilities.greater(cutoff).squeeze([-1]);

      // Cast to float32.
      // TODO: consider casting to int. Once argmax is added,
      // this probably won't be necessary.
      classes = classes.toFloat();

      classes = tf.image.resizeNearestNeighbor(classes, [
        originalWidth,
        originalHeight,
      ]);

      // Put predicted image in canvas.
      return tf.toPixels(classes, (canvas = canvas));
    })
    .catch(e => {
      // TODO: what should we do if the promise is rejected?
      console.log('Failed to load model. Error is printed below.');
      console.log(e);
    });
}
