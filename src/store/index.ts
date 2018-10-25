import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


interface FeaturesModuleState {
  dataURL: string;
  imageData: ImageData;
}

const featuresModule = {
  state: {
    dataURL: '',
  },

  mutations: {
    // Set information about the image from an input change event.
    setImageInfo(state: FeaturesModuleState, event: Event) {

      if (event.target !== null) {

        const input = event.target as HTMLInputElement;
        const files = input.files as FileList;
        if (files !== null && files[0]) {
          const file: File = files[0];

          const reader: FileReader = new FileReader();
          reader.onload = (e: FileReaderProgressEvent) => {
            if (e.target !== null) {
              state.dataURL = e.target.result;
            } else {
              // TODO(kaczmarj): improve error handling.
              console.log('file reader got unexpected null value');
            }
          };
          reader.readAsDataURL(file);
        }
      }
    },
  },

  getters: {
    // dataURLAsUint8ClampedArray(state: featuresModuleState): Uint8Array {
    //   // https://gist.github.com/borismus/1032746
    //   const marker = ';base64,';
    //   const idx = state.dataURL.indexOf(marker) + marker.length;
    //   const raw = window.atob(state.dataURL.substring(idx));
    //   // const typedArray = new Uint8ClampedArray(new ArrayBuffer(raw.length))
    //   const typedArray = new Uint8Array(new ArrayBuffer(raw.length))

    //   console.log('RAW LENGTH', raw.length)
    //   console.log('ARRAY LENGTH', typedArray.length)

    //   let i: number
    //   for (i = 0; i < raw.length; i++) {
    //     typedArray[i] = raw.charCodeAt(i);
    //   }

    //   return typedArray
    // },

    dataURLAsImageData(state: FeaturesModuleState): ImageData | undefined {
      // TODO(kaczmarj): Improve error checking. For example, this will fail if src is empty.
      // https://stackoverflow.com/a/10755011/5666087

      if (state.dataURL !== '') {
        const img = new Image();
        img.src = state.dataURL;

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(img, 0, 0);

        return ctx.getImageData(0, 0, img.width, img.height);
      } else {
        return undefined;
      }
    },
  },
};


// interface modelModuleStateInterface {
//   URL: string,
// }

const modelModule = {
  state: {
    URL: String,
    predictedDataURL: '',
  },

  mutations: {
  },
};


export const store = new Vuex.Store({
  modules: {
    features: featuresModule,
    model: modelModule,
  },
});
