<template>
  <v-app dark class="primary">
    <div class="tertiary" id="design-bar"></div>
    <tool-bar class="primary" v-if="state.isPhone"></tool-bar>
    <div class="top-container primary">
      <drawer class="drawer" v-if="!state.isPhone"></drawer>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import ToolBar from "./components/ToolBar";
import constant from "../constant.js";

export default {
  data() {
    return {
      state: this.$store.state
    };
  },
  components: {
    drawer: Drawer,
    ToolBar
  },
  created() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  methods: {
    handleWindowResize() {
      const width = window.innerWidth;
      this.$store.commit("isPhone", width < constant.PHONE_SIZE);
      this.$store.commit("isTablet", width < constant.TABLET_SIZE);
    }
  }
};
</script>

<style>
.top-container {
  display: flex;
  padding: 0px;
  margin: 0px;
}
.drawer {
  flex: 0 0 auto;
}
#design-bar {
  height: 20px;
}
</style>
