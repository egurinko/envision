import { UiS, UiG, UiRG, UiM, UiRM, UiA, UiRA } from "./modules/ui/types";
import { UserS, UserG, UserRG, UserM, UserRM, UserA, UserRA } from "./modules/user/types";
import { ResponseS, ResponseG, ResponseRG, ResponseM, ResponseRM, ResponseA, ResponseRA } from "./modules/response/types";

export type State = {
    ui: UiS;
    user: UserS;
    response: ResponseS;
};

export type IGetters = {
    ui: UiG;
    user: UserG;
    response: ResponseG;
};

export type IRGetters = UiRG & UserRG & ResponseRG;

export type IMutations = {
    ui: UiM;
    user: UserM;
    response: ResponseM;
};

export type IRMutations = UiRM & UserRM & ResponseRM;

export type IActions = {
    ui: UiA;
    user: UserA;
    response: ResponseA;
};

export type IRActions = UiRA & UserRA & ResponseRA;
