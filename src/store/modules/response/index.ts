import { Getters, Actions, Mutations } from "vuex";
import { State, IActions, IGetters, IMutations } from "../../types";

const state: State["response"] = {
    status: "",
    method: "",
    errors: ""
};


const getters: Getters<State["response"], IGetters["response"]> = {
    getResponse(state, getters) {
        return state;
    }
};

const actions: Actions<State["response"], IActions["response"], IGetters["response"], IMutations["response"]> = {
    setResponse(ctx, payload){
        ctx.commit("setStatus", payload.status);
        ctx.commit("setMethod", payload.method);
        ctx.commit("setErrors", payload.errors);
    }
};

const mutations: Mutations<State["response"], IMutations["response"]> = {
    setStatus(state, payload) {
        state.status = payload;
    },
    setMethod(state, payload) {
        state.method = payload;
    },
    setErrors(state, payload) {
        state.errors = payload;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};