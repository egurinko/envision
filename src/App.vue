<template>
  <v-app dark>
    <div class="tertiary" id="design-bar"></div>
    <tool-bar class="primary" v-if="state.isPhone"></tool-bar>
    <div class="top-container primary">
      <drawer class="drawer" v-if="!state.isPhone"></drawer>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import Graphs from "./components/Graphs";
import ToolBar from "./components/ToolBar";

export default {
  data() {
    return {
      state: this.$store.state
    };
  },
  components: {
    drawer: Drawer,
    Graphs,
    ToolBar
  },
  created() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  methods: {
    handleWindowResize() {
      const width = window.innerWidth;
      this.$store.commit("judgeWindow", width < 600);
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
