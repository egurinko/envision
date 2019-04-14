import Vue from "vue";
import Vuex from "vuex";
import colors from "./module/colorTheme";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPhone: window.innerWidth < 600,
    isTablet: window.innerWidth < 960,
    domain:
      process.env.NODE_ENV === "development"
        ? "https://prod-bot-staging.herokuapp.com/api"
        : "/api",
    colors,
    menus: [
      { icon: "home", title: "Home" },
      { icon: "bar_chart", title: "Graphs" }
    ],
    annotations: {
      TEMPERATURE: { "LOWER LIMIT": 22, "UPPER LIMIT": 24 },
      HUMIDITY: { "LOWER LIMIT": 40, "UPPER LIMIT": 60 },
      CO2: { "UPPER LIMIT": 700 },
      LUX: { "LOWER LIMIT": 1300, "UPPER LIMIT": 1800 },
      PRESSURE: { "LOWER LIMIT": 990 }
    }
  },
  mutations: {
    isPhone(state, isPhone) {
      state.isPhone = isPhone;
    },
    isTablet(state, isTablet) {
      state.isTablet = isTablet;
    }
  },
  actions: {}
});
