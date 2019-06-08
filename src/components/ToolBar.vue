<template>
  <v-toolbar flat>
    <v-container class="primary pa-3">
      <v-layout class="primary" nowrap align-center>
        <v-flex v-if="state.isPhone">
          <v-img width="30" height="30" contain :src="require('../assets/logo2.png')"/>
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex v-if="state.isPhone" v-for="(item, index) in menus" :key="index">
          <v-btn icon flat @click="handleClick(item.route)">
            <v-icon size="25">{{ item.icon }}</v-icon>
          </v-btn>
        </v-flex>

        <v-spacer></v-spacer>

        <v-btn color="lightGreen" flat dark outline small @click="goLogin">
          <span class="auth pa-1">Login</span>
        </v-btn>
      </v-layout>
    </v-container>
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
