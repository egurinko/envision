<template>
  <v-toolbar flat>
    <v-container class="primary pa-3">
      <v-layout class="primary" nowrap align-center>
        <v-flex v-if="isPhone">
          <v-img
            width="30"
            height="30"
            contain
            :src="require('../assets/logo2.png')"
          />
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex v-for="(item, index) in menus" v-if="isPhone" :key="index">
          <v-btn icon flat @click="handleClick(item.route)">
            <v-icon size="25">{{ item.icon }}</v-icon>
          </v-btn>
        </v-flex>

        <v-spacer></v-spacer>
        <div v-if="!isPhone && isLoggedIn" class="px-4 account-container">
          <v-icon class="account-icon" dark>account_circle</v-icon>
          <span class="account-username">{{ username }}</span>
        </div>

        <v-btn
          v-if="!isLoggedIn"
          color="lightGreen"
          flat
          dark
          outline
          small
          @click="goLogin"
        >
          <span class="auth pa-1">Login</span>
        </v-btn>
        <v-btn
          v-if="isLoggedIn"
          color="lightGreen"
          flat
          dark
          outline
          small
          @click="handleLogout"
        >
          <span class="auth pa-1">Logout</span>
        </v-btn>
      </v-layout>
    </v-container>
  </v-toolbar>
</template>
<script>
import { removeCookie } from "../module/controllCookie";
import { setTimeout } from "timers";
import { mapState } from "vuex";

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
    ...mapState({
      isLoggedIn: state => state.isLoggedIn,
      username: state => state.username,
      isPhone: state => state.isPhone
    })
  },
  methods: {
    handleClick(route) {
      this.$router.push(route);
    },
    goLogin() {
      this.$router.push("login");
    },
    handleLogout() {
      this.$store.commit("setUsername", "");
      this.$store.commit("setIsloggedIn", false);
      removeCookie();
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
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
.account-container {
  display: flex;
  align-items: center;
}
.account-username {
  font-size: 18px;
  margin-left: 10px;
}
.account-account-icon {
  padding-top: 5px;
}
</style>
