import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPhone: window.innerWidth < 726,
    domain:
      process.env.NODE_ENV === "development"
        ? "https://prod-bot-staging.herokuapp.com/api"
        : "/api"
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
