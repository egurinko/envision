import Vue from "vue";

export enum RouteNames {
  HOME = "Home",
  GRAPHS = "Graphs",
  LOGIN = "Login",
  USERS_REGISTRATION = "UsersRegistration",
  USERS = "Users",
};

type StrRecord = Record<string, any>
type Query<T extends StrRecord> = { query: T };
type Params<T extends StrRecord> = { params: T };

// If you want to use query or params, use this.
// export type ListOption = (
//   Query<{ keyword: string }>
// );

// export type DetailOption = (
//   Params<{ id: string }>
// );

export type RouteOption = {
  [RouteNames.HOME]: {},
  [RouteNames.GRAPHS]: {},
  [RouteNames.LOGIN]: {},
  [RouteNames.USERS_REGISTRATION]: {},
  [RouteNames.USERS]: {},
};

export type Route = {
  path: string;
  name: string;
  component: Vue.Component;
  meta?: { 
    icon: string;
  }
}