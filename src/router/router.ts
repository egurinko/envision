import Vue from "vue";
import Router from "vue-router";

import { RouteNames } from "./route.types";
import { enhance } from "./extension";

import Home from "../views/Home.vue";
import Graphs from "../views/Graphs.vue";
import Login from "../views/Login.vue";
import UserRegistration from "../views/users/new.vue";
import UserOverview from "../views/users/index.vue";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: RouteNames.HOME,
      component: Home,
      meta: { icon: "home" }
    },
    {
      path: "/graphs",
      name: RouteNames.GRAPHS,
      component: Graphs,
      meta: { icon: "bar_chart" }
    },
    {
      path: "/login",
      name: RouteNames.LOGIN,
      component: Login
    },
    {
      path: "/users/new",
      name: RouteNames.USERS_REGISTRATION,
      component: UserRegistration
    },
    {
      path: "/users",
      name: RouteNames.USERS,
      component: UserOverview,
      meta: { icon: "supervisor_account" }
    },
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch("response/setResponse", { status: "", method: "", errors: "" });
  next();
});

export default enhance(router);
