<template>
  <div v-if="$store.state.features.dataURL.length > 0">
      <div>
        <h3>Evaluate</h3>
        <form @submit.prevent="predictImage" class="modelForm">
          <label>
            <b-select v-model="modelURL" :options="models" />
          </label>
          <b-button v-if="!predicted" type="submit">Run</b-button>
        </form>

      </div>

      <canvas ref="predictionsCanvas" id="predictions"></canvas>

      <div v-if="predicted">
        <b-link href="#" ref="predictionsDownloadLink" download="prediction.png" @click="downloadPredictionsCanvas">Download</b-link>
      </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { predict } from '../assets/predict';

export default Vue.extend({
  name: 'PredictImage',
  props: {},
  data() {
    return {
      modelURL: '',
      predicted: false,
      models: [
        { value: '', text: 'please select an operation' },
        {
          value:
            'https://kaczmarj.github.io/nobrainer-js/models/brain-extraction/2d/unet-minmax/model.json',
          text: 'brain extraction',
        },
      ],
    };
  },
  methods: {
    predictImage(): void {
      predict(
        this.modelURL,
        this.$store.getters.dataURLAsImageData,
        1,
        'minmax',
        this.$refs.predictionsCanvas as HTMLCanvasElement,
      );
      this.predicted = true;
    },
    downloadPredictionsCanvas(): void {
      const canvas = this.$refs.predictionsCanvas as HTMLCanvasElement;
      const url = canvas.toDataURL('image/png');
      const anchor = this.$refs.predictionsDownloadLink as HTMLAnchorElement;
      anchor.href = url;
    },
  },
});
</script>

<style scoped>
form.modelForm {
  margin: 25px 0 25px 0;
}
form.modelForm input.modelURL {
  width: 300px;
}
</style>
