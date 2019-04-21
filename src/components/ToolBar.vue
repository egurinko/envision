<template>
  <v-toolbar flat>
    <v-img
      width="30"
      height="30"
      contain
      :src="require('../assets/logo2.png')"
    />
    <v-spacer></v-spacer>
    <v-toolbar-items v-for="(item, index) in menus" :key="index">
      <div class="spacer"></div>
      <v-btn icon flat @click="handleClick(item.route)"
        ><v-icon size="25">{{ item.icon }}</v-icon></v-btn
      >
      <div class="spacer"></div>
    </v-toolbar-items>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>
<script>
export default {
  computed: {
    menus: function() {
      const icons = [];
      this.$router.options.routes.map(route => {
        if (route.meta) {
          icons.push({ icon: route.meta.icon, route: route.path });
        }
      });
      return icons;
    }
  },
  methods: {
    handleClick(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style scoped>
.spacer {
  margin: 20px;
}
</style>
