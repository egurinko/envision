import Vue from "vue";
import Vuex from "vuex";
import ui from "./modules/ui";
import user from "./modules/user";

Vue.use(Vuex);

const debug = process.env.NODE_ENV === "development";

export default new Vuex.Store({
  modules: {
    ui,
    user
  },
  strict: debug,
  state: {
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
    setIsLoading(state: any, isLoading) {
      state.isLoading = isLoading;
    },
    changeTimespan(state: any, timespan) {
      state.timespans.selected = timespan;
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
