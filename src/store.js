import Vue from "vue";
import Vuex from "vuex";
import colors from "./module/colorTheme";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPhone: window.innerWidth < 726,
    domain:
      process.env.NODE_ENV === "development"
        ? "https://prod-bot-staging.herokuapp.com/api"
        : "/api",
    colors
  },
  mutations: {
    judgeWindow(state, isPhone) {
      state.isPhone = isPhone;
    }
  },
  actions: {
    judgeWindow(context, isPhone) {
      context.commit("judgeWindow", isPhone);
    }
  }
});
