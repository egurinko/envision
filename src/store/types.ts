import { UiS, UiG, UiRG, UiM, UiRM, UiA, UiRA } from "./modules/ui/types";

export type State = {
    ui: UiS;
};

export type IGetters = {
    ui: UiG;
};

export type IRGetters = UiRG;

export type IMutations = {
    ui: UiM;
};

export type IRMutations = UiRM;

export type IActions = {
    ui: UiA;
};

export type IRActions = UiRA;
