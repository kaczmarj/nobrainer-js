<template>
  <div id="app">
    <UploadImage />
    <PredictImage />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UploadImage from "./components/UploadImage.vue";
import PredictImage from "./components/PredictImage.vue";
import { store } from "./store/index";

export default Vue.extend({
  name: "app",
  // This syntax allows us to reference the shared store object as `this.$store` in other
  // components without having to explicitly import the store object.
  store,
  components: {
    UploadImage,
    PredictImage
  }
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
