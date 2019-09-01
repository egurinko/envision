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
    response: {
      status: "",
      method: "",
      errors: ""
    }
  },
  mutations: {
    setResponse(state: any, response) {
      state.response = response;
    }
  }
});
