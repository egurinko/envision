<template>
  <v-app>
    <div class="top-container">
      <drawer class="drawer"></drawer>
      <result class="result"></result>
    </div>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import Result from "./components/Result";

export default {
  components: {
    drawer: Drawer,
    Result
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
