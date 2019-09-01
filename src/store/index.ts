import Vue from "vue";
import Vuex from "vuex";
import constant from "../../constant";
import config from "../../config";
import ui from "./modules/ui";

Vue.use(Vuex);

const debug = process.env.NODE_ENV === "development";

export default new Vuex.Store({
  modules: {
    ui
  },
  strict: debug,
  state: {
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
    setIsloggedIn(state: any, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setIsLoading(state: any, isLoading) {
      state.isLoading = isLoading;
    },
    changeTimespan(state: any, timespan) {
      state.timespans.selected = timespan;
    },
    setUsername(state: any, username) {
      state.username = username;
    },
    setResponse(state: any, response) {
      state.response = response;
    }
  },
  actions: {},
  getters: {
    getTimespan: (state: any) => {
      const selected = state.timespans.selected;
      return state.timespans.timespan[selected];
    }
  }
});
