<template>
  <v-layout row justify-center>
    <v-dialog v-model="isLoading" persistent max-width="290">
      <sync-loader id="loader" :loading="isLoading"></sync-loader>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import SyncLoader from "vue-spinner/src/SyncLoader";

export default {
  components: {
    SyncLoader
  },
  computed: {
    ...mapState({
      isPhone: state => state.isPhone,
      isLoading: state => state.isLoading
    })
  },
  created() {},
  methods: {}
};
</script>

<style>
#loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
  margin: auto;
  z-index: 10000;
}
</style>
