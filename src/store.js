import Vue from "vue";
import Vuex from "vuex";
import colors from "./module/colorTheme";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPhone: window.innerWidth < 600,
    domain:
      process.env.NODE_ENV === "development"
        ? "https://prod-bot-staging.herokuapp.com/api"
        : "/api",
    colors,
    menus: [
      { icon: "home", title: "HOME" },
      { icon: "bar_chart", title: "CHARTS" }
    ]
  },
  mutations: {
    judgeWindow(state, isPhone) {
      state.isPhone = isPhone;
    }
  },
  actions: {}
});
