<template>
  <div v-if="$store.state.features.dataURL.length > 0">
      <div>

        <form @submit.prevent="predictImage" class="modelForm">
          <label>
            Model:
            <input type="url" v-model="modelURL" class="modelURL" />
          </label>
          <button v-if="!predicted" type="submit">Predict</button>
        </form>

          <!-- Model URL: <input type="url" v-model="modelURL" placeholder="enter a URL" @submit="predictImage"> -->
      </div>

      <canvas ref="predictionsCanvas" id="predictions"></canvas>

      <div v-if="predicted">
        <a href="#" ref="predictionsDownloadLink" download="prediction.png" @click="downloadPredictionsCanvas">Download</a>
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
