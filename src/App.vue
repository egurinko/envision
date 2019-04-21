<template>
  <v-app dark class="primary">
    <div id="design-bar" class="tertiary"></div>
    <tool-bar v-if="state.isPhone" class="primary"></tool-bar>
    <div class="top-container primary">
      <drawer v-if="!state.isPhone" class="drawer"></drawer>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import ToolBar from "./components/ToolBar";
import constant from "../constant.js";

export default {
  components: {
    drawer: Drawer,
    ToolBar
  },
  computed: {
    state: function() {
      return this.$store.state;
    }
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
