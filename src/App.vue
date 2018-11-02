<template>
  <div id="app">
    <b-container>
      <b-row align-h="center" class="mb-5"><Header /></b-row>
      <b-row align-h="center" class="mb-5"><UploadImage /></b-row>
      <b-row align-h="center"><PredictImage /></b-row>

    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/Header.vue';
import UploadImage from './components/UploadImage.vue';
import PredictImage from './components/PredictImage.vue';
import { store } from './store/index';

export default Vue.extend({
  name: 'app',
  // This syntax allows us to reference the shared store object as `this.$store` in other
  // components without having to explicitly import the store object.
  store,
  components: {
    Header,
    UploadImage,
    PredictImage,
  },
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
