import Vue from "vue";
import Vuex from "vuex";
import colors from "./module/colorTheme";
import annotations from "./module/annotations";
import constant from "../constant";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPhone: window.innerWidth < constant.PHONE_SIZE,
    isTablet: window.innerWidth < constant.TABLET_SIZE,
    username: "",
    isLoggedIn: false,
    domain:
      process.env.NODE_ENV === "development"
        ? "https://prod-bot-staging.herokuapp.com/api"
        : "/api",
    colors,
    annotations: annotations,
    timespans: {
      selected: "AN HOUR",
      timespan: {
        "AN HOUR": 1,
        "3 HOURS": 3,
        DAILY: 24,
        WEEK: 24 * 7
      }
    },
    response: {
      status: "",
      errors: ""
    }
  },
  mutations: {
    isPhone(state, isPhone) {
      state.isPhone = isPhone;
    },
    isTablet(state, isTablet) {
      state.isTablet = isTablet;
    },
    setIsloggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    changeTimespan(state, timespan) {
      state.timespans.selected = timespan;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setResponse(state, response) {
      state.response = response;
    }
  },
  actions: {},
  getters: {
    getTimespan: state => {
      const selected = state.timespans.selected;
      return state.timespans.timespan[selected];
    }
  }
});
