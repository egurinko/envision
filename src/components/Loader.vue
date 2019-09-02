<template>
  <v-layout
    v-if="isLoading"
    row
    justify-center
    align-center
  >
    <v-dialog
      v-model="isLoading"
      persistent
    >
      <sync-loader
        id="loader"
        :loading="isLoading" 
      />
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";

export default Vue.extend({
  name: "Loader",
  components: {
    SyncLoader
  },
  computed: {
    isPhone: function(): boolean {
      return this.$store.getters["ui/getIsPhone"];
    },
    isLoading: function(): boolean {
      return this.$store.getters["ui/getIsLoading"];
    }
  }
});
</script>

<style>
#loader {
  position: fixed;
  top: 50%;
  left: 100%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
  margin: auto;
  z-index: 10000;
}
</style>
