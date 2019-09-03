<template>
  <v-app
    dark
    class="primary"
  >
    <Loader />
    <div
      id="design-bar"
      class="tertiary" 
    />
    <v-container
      id="app-container"
      class="primary"
    >
      <v-layout
        class="primary"
      >
        <v-flex v-if="!isPhone">
          <drawer class="drawer px-3 py-4" />
        </v-flex>
        <v-flex class="main-content">
          <v-container
            id="main-content-container"
            class="primary"
          >
            <v-layout
              class="primary"
            >
              <v-flex>
                <tool-bar class="primary" />
                <router-view />
                <bottom-navigation v-if="isPhone" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosRequestConfig } from "axios";
import Drawer from "./components/Drawer.vue";
import ToolBar from "./components/ToolBar.vue";
import Loader from "./components/Loader.vue";
import BottomNavigation from "./components/BottomNavigation.vue";
import constant from "../constant.js";
import { getCookie } from "./utils/controllCookie";

export default Vue.extend({
  name: "App",
  components: {
    drawer: Drawer,
    ToolBar,
    Loader,
    BottomNavigation
  },
  computed: {
    isPhone: function(): boolean {
      return this.$store.getters["ui/getIsPhone"];
    }
  },
  created(): void {
    window.addEventListener("resize", (this as any).handleWindowResize);
    (this as any).handleLoginStatus();
  },
  methods: {
    handleWindowResize(): void {
      const width = window.innerWidth;
      this.$store.dispatch("ui/setIsPhone", width);
      this.$store.dispatch("ui/setIsTablet", width);
    },
    handleLoginStatus(): void {
      const cookie = getCookie();
      if (cookie.token !== "") {
        this.$store.dispatch("user/setIsLoggedIn", true);
        this.$store.dispatch("user/setUsername", cookie.username);
      }
    }
  }
});
</script>

<style>
#app-container,
#main-content-container {
  margin: 0px;
  padding: 0px;
}
#app-container {
  width: 100%;
  max-width: 100%;
}
.main-content {
  width: 100%;
}
#design-bar {
  height: 20px;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #373740 inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
