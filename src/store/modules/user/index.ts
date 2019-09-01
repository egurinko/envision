import { Getters, Actions, Mutations } from "vuex";
import { State, IActions, IGetters, IMutations } from "../../types";

const state: State["user"] = {
    username: "",
    isLoggedIn: false
};


const getters: Getters<State["user"], IGetters["user"]> = {
    getUsername(state, getters) {
        return state.username;
    },
    getIsLoggedIn(state, getters) {
        return state.isLoggedIn;
    }
};

const actions: Actions<State["user"], IActions["user"], IGetters["user"], IMutations["user"]> = {
    setUsername(ctx, payload){
        ctx.commit("setUsername", payload);
    },
    setIsLoggedIn(ctx, payload){
        ctx.commit("setIsLoggedIn", payload);
    }
};

const mutations: Mutations<State["user"], IMutations["user"]> = {
    setUsername(state, payload) {
        state.username = payload;
    },
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};