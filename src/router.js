import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Graphs from "./components/Graphs.vue";
import Login from "./components/Login.vue";

Vue.use(Router);

export default new Router({
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
    { path: "*", redirect: "/" }
  ]
});
