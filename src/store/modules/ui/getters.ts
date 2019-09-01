import { Getters } from "vuex";
import { IGetters, State } from "../../types";

const getters: Getters<State["ui"], IGetters["ui"]> = {
    getIsPhone(state, getters) {
        return state.isPhone;
    },
    getIsTablet(state, getters) {
        return state.isTablet;
    }
};

export default getters;