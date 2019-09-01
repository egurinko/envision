import { UiS, UiG, UiRG, UiM, UiRM, UiA, UiRA } from "./modules/ui/types";
import { UserS, UserG, UserRG, UserM, UserRM, UserA, UserRA } from "./modules/user/types";

export type State = {
    ui: UiS;
    user: UserS;
};

export type IGetters = {
    ui: UiG;
    user: UserG;
};

export type IRGetters = UiRG & UserRG;

export type IMutations = {
    ui: UiM;
    user: UserM;
};

export type IRMutations = UiRM & UserRM;

export type IActions = {
    ui: UiA;
    user: UserA;
};

export type IRActions = UiRA & UserRA;
