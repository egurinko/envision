import { Actions } from "vuex";
import { State, IActions, IGetters, IMutations } from "../../types";
import constant from "../../../../constant";

const actions: Actions<State["ui"], IActions["ui"], IGetters["ui"], IMutations["ui"]> = {
    setIsPhone(ctx, payload){
        const isPhone: boolean = payload < constant.PHONE_SIZE;
        ctx.commit("setIsPhone", isPhone);
    },
    setIsTablet(ctx, payload){
        const isTablet: boolean = payload < constant.TABLET_SIZE;
        ctx.commit("setIsTablet", isTablet);
    },
    setTimespan(ctx, payload){
        ctx.commit("setTimespan", payload);
    },
    setIsLoading(ctx, payload){
        ctx.commit("setIsLoading", payload);
    }
};

export default actions;