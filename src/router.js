import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Graphs from "./components/Graphs.vue";
import Login from "./components/Login.vue";
import UserRegistration from "./components/users/new.vue";
import store from "./store";

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
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  store.commit("setResponse", { status: "", errors: "" });
  next();
});

export default router;
