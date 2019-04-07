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
      { icon: "home", title: "Home" },
      { icon: "bar_chart", title: "Graphs" }
    ]
  },
  mutations: {
    judgeWindow(state, isPhone) {
      state.isPhone = isPhone;
    }
  },
  actions: {}
});
