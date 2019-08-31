import Vue from "vue";
import Vuex from "vuex";
import constant from "../../constant";
import config from "../../config";

Vue.use(Vuex);

const debug = process.env.NODE_ENV === "development";

export default new Vuex.Store({
  state: {
    isPhone: window.innerWidth < constant.PHONE_SIZE,
    isTablet: window.innerWidth < constant.TABLET_SIZE,
    username: "",
    isLoggedIn: false,
    isLoading: false,
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
      method: "",
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
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
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
