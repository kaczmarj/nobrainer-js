// Used https://jsfiddle.net/panamaprophet/0L2433gu/ as a reference.

<template>
  <div>
    <h3>Upload an image</h3>
      <div v-if="!$store.state.features.dataURL">
        <div
          ref="dropZone"
          :class="['drop-zone', dragging ? 'drop-zone-over' : '']"
          @dragenter="dragging=true"
          @dragleave="dragging=false">
            <div class="drop-zone-text">
              <span>Drop image here or click to select</span>
            </div>
            <input type="file" accept="image/*" @change="$store.commit('setImageInfo', $event)">
        </div>
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
    return {
      dataURL: this.$store.state.features.dataURL,
      dragging: false,
    };
  },
  computed: {},
  methods: {
    handleDragOver(e: Event) {
      return {};
    },
  },
});
</script>

<style lang="scss" scoped>
.drop-zone-over {
}

.drop-zone {
  height: 200px;
  width: 400px;
  position: relative;
  user-select: none;
  border: 5px dashed rgb(88, 88, 88);

  // transition: visibility 175ms, opacity 175ms;
  &:hover {
    border-color: rgb(30, 146, 255);
    .drop-zone-text {
      color: rgb(30, 146, 255);
    }
  }
}

.drop-zone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; // this hides the input object
}

.drop-zone-text {
  position: absolute;
  top: 50%;
  color: rgb(88, 88, 88);
  text-align: center;
  align-items: middle;
  transform: translate(0, -50%);
  width: 100%;
  span {
    display: block;
  }
}
</style>
