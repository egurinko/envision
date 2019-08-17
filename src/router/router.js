import Vue from "vue";
import Router from "vue-router";
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
      name: "home",
      component: Home,
      meta: { icon: "home" }
    },
    {
      path: "/graphs",
      name: "graphs",
      component: Graphs,
      meta: { icon: "bar_chart" }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/users/new",
      name: "usersRegistration",
      component: UserRegistration
    },
    {
      path: "/users",
      name: "userOverview",
      component: UserOverview,
      meta: { icon: "supervisor_account" }
    },
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  store.commit("setResponse", { status: "", method: "", errors: "" });
  next();
});

export default router;
