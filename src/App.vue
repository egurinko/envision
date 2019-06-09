<template>
  <v-app dark class="primary">
    <Loader></Loader>
    <div id="design-bar" class="tertiary"></div>
    <v-container id="app-container" class="primary">
      <v-layout class="primary" row nowrap>
        <v-flex v-if="!isPhone">
          <drawer class="drawer px-3 py-4"></drawer>
        </v-flex>
        <v-flex class="main-content">
          <v-container id="main-content-container" class="primary">
            <v-layout class="primary" column>
              <v-flex>
                <tool-bar class="primary"></tool-bar>
                <router-view></router-view>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import ToolBar from "./components/ToolBar";
import Loader from "./components/Loader";
import constant from "../constant.js";
import { getCookie } from "./module/controllCookie";
import { mapState } from "vuex";

export default {
  components: {
    drawer: Drawer,
    ToolBar,
    Loader
  },
  computed: {
    ...mapState({
      isPhone: state => state.isPhone
    })
  },
  created() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleLoginStatus();
  },
  methods: {
    handleWindowResize() {
      const width = window.innerWidth;
      this.$store.commit("isPhone", width < constant.PHONE_SIZE);
      this.$store.commit("isTablet", width < constant.TABLET_SIZE);
    },
    handleLoginStatus() {
      const cookie = getCookie();
      if (cookie.token !== "") {
        this.$store.commit("setIsloggedIn", true);
        this.$store.commit("setUsername", cookie.username);
      }
    }
  }
};
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
