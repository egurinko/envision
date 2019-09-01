import { Getters } from "vuex";
import { IGetters, State } from "../../types";
import convertTimespan from "../../../utils/convertTimespan";

const getters: Getters<State["ui"], IGetters["ui"]> = {
    getIsPhone(state, getters) {
        return state.isPhone;
    },
    getIsTablet(state, getters) {
        return state.isTablet;
    },
    getConvertedTimespan(state, getters) {
        return convertTimespan[state.selectedTimespan];
    },
    getSelectedTimespan(state, getters) {
        return state.selectedTimespan;
    },
    getIsLoading(state, getters) {
        return state.isLoading;
    }
};

export default getters;