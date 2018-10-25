<template>
  <div>
      <h3>Upload an image</h3>
      <div v-if="$store.state.features.dataURL.length === 0">
          <input type="file" @change="$store.commit('setImageInfo', $event)" accept="image/*">
      </div>
      <div v-else>
          <img id="features" :src="$store.state.features.dataURL">
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'UploadImage',
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
