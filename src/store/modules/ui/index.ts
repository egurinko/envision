import constant from "../../../../constant";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

import { State } from "../../types";

const state: State["ui"] = {
    isPhone: window.innerWidth < constant.PHONE_SIZE,
    isTablet: window.innerWidth < constant.TABLET_SIZE,
    selectedTimespan: "AN HOUR",
    isLoading: false,
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};