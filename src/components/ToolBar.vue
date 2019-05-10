<template>
  <v-toolbar flat>
    <v-img
      v-if="state.isPhone"
      width="30"
      height="30"
      contain
      :src="require('../assets/logo2.png')"
    />
    <v-spacer></v-spacer>
    <v-toolbar-items
      v-for="(item, index) in menus"
      v-if="state.isPhone"
      :key="index"
    >
      <div class="spacer"></div>
      <v-btn icon flat @click="handleClick(item.route)"
        ><v-icon size="25">{{ item.icon }}</v-icon></v-btn
      >
      <div class="spacer"></div>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn color="lightGreen" flat dark outline small @click="goLogin"
      ><span class="auth pa-1">Login</span></v-btn
    >
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
    },
    state: function() {
      return this.$store.state;
    }
  },
  methods: {
    handleClick(route) {
      this.$router.push(route);
    },
    goLogin() {
      this.$router.push("login");
    }
  }
};
</script>
<style scoped>
.spacer {
  margin: 20px;
}
.auth {
  color: white;
}
</style>
