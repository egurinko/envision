import Vue from "vue";
import Vuex from "vuex";
import colors from "./module/colorTheme";
import constant from "../constant";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPhone: window.innerWidth < constant.PHONE_SIZE,
    isTablet: window.innerWidth < constant.TABLET_SIZE,
    domain:
      process.env.NODE_ENV === "development"
        ? "https://prod-bot-staging.herokuapp.com/api"
        : "/api",
    colors,
    annotations: {
      TEMPERATURE: {
        "LOWER LIMIT": constant.TEMP_LOWER_LIMIT,
        "UPPER LIMIT": constant.TEMP_UPPER_LIMIT
      },
      HUMIDITY: {
        "LOWER LIMIT": constant.HUM_LOWER_LIMIT,
        "UPPER LIMIT": constant.HUM_UPPER_LIMIT
      },
      CO2: { "UPPER LIMIT": constant.CO2_UPPER_LIMIT },
      LUX: {
        "LOWER LIMIT": constant.LUX_LOWER_LIMIT,
        "UPPER LIMIT": constant.LUX_UPPER_LIMIT
      },
      PRESSURE: { "LOWER LIMIT": constant.PRESSURE_LOWER_LIMIT },
      "COLOR TEMPERATURE": {
        "LOWER LIMIT": constant.COLOR_TEMP_LOWER_LIMIT,
        "UPPER LIMIT": constant.COLOR_TEMP_UPPER_LIMIT
      },
      SNACK: { "LOWER LIMIT": constant.SNACK_LOWER_LIMIT }
    },
    timespans: {
      selected: "AN HOUR",
      timespan: {
        "AN HOUR": 1,
        "3 HOURS": 3,
        DAILY: 24,
        WEEK: 24 * 7
      }
    }
  },
  mutations: {
    isPhone(state, isPhone) {
      state.isPhone = isPhone;
    },
    isTablet(state, isTablet) {
      state.isTablet = isTablet;
    },
    changeTimespan(state, timespan) {
      state.timespans.selected = timespan;
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
