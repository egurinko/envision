import Vue from "vue";
import Vuex from "vuex";
import ui from "./modules/ui";
import user from "./modules/user";
import response from "./modules/response";

Vue.use(Vuex);

const debug = process.env.NODE_ENV === "development";

export default new Vuex.Store({
  modules: {
    ui,
    user,
    response
  },
  strict: debug
});
