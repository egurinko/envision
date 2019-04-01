import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPhone: window.innerWidth < 726,
    domain: "https://prod-bot-staging.herokuapp.com"
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
