<template>
  <v-app>
    <div class="top-container">
      <drawer class="drawer"></drawer>
      <nav-bar class="navbar"></nav-bar>
    </div>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import NavBar from "./components/NavBar";

export default {
  components: {
    drawer: Drawer,
    NavBar
  },
  created() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  methods: {
    handleWindowResize() {
      const width = window.innerWidth;
      this.$store.dispatch("judgeWindow", width < 767);
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
</style>
