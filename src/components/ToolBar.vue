<template>
  <v-toolbar class="elevation-0 toolbar">
    <img
      v-if="isPhone"
      width="35"
      height="35"
      class="ml-2"
      :src="require('../assets/logo2.png')"
    >
    <v-btn
      v-if="!isLoggedIn"
      color="lightGreen"
      class="toolbar-button"
      tile
      outlined
      small
      @click="goLogin"
    >
      <span class="auth pa-1">Login</span>
    </v-btn>
    <div
      v-if="isLoggedIn"
      class="toolbar-button"
    >
      <v-icon
        v-if="!isPhone"
        class="account-icon"
        dark
      >
        account_circle
      </v-icon>
      <span
        v-if="!isPhone"
        class="account-username"
      >{{ username }}</span>
      <v-btn
        color="lightGreen"
        tile
        outlined
        small
        @click="handleLogout"
      >
        <span class="auth pa-1">Logout</span>
      </v-btn>
    </div>
  </v-toolbar>
</template>
<script>
import { removeCookie } from "../utils/controllCookie";
import { setTimeout } from "timers";

export default {
  name: "Toolbar",
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
    isPhone: function() {
      return this.$store.getters["ui/getIsPhone"];
    },
    username: function() {
      return this.$store.getters["user/getUsername"];
    },
    isLoggedIn: function() {
      return this.$store.getters["user/getIsLoggedIn"];
    }
  },
  methods: {
    handleClick(route) {
      this.$router.push(route);
    },
    goLogin() {
      this.$router.push("/login");
    },
    handleLogout() {
      this.$store.dispatch("user/setIsLoggedIn", false);
      this.$store.dispatch("user/setUsername", "");
      removeCookie();
      setTimeout(() => {
        if (this.$route.path !== "/" ) {
          this.$router.push("/");
        }
      }, 1000);
    }
  }
};
</script>
<style scoped>
.toolbar{
  padding-top: 2%;
}
.toolbar-button{
  margin-left: auto;
  margin-right: 3%;
  margin-top: 5px;
}
.auth {
  color: white;
}
.account-username {
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;
}
.account-account-icon {
  padding-top: 8px;
}
</style>
