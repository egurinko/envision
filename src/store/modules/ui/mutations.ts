import { Mutations } from "vuex";
import { State, IMutations } from "../../types";

const mutations: Mutations<State["ui"], IMutations["ui"]> = {
    setIsPhone(state, payload) {
        state.isPhone = payload;
    },
    setIsTablet(state, payload) {
        state.isTablet = payload;
    }
};

export default mutations;