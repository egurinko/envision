import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/index";
import constant from "../constant";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.prototype.$constant = constant;

Sentry.init({
  dsn: "https://e0d73a41264c47708a3efca33256994d@sentry.io/1441419",
  integrations: [
    new Integrations.Vue({
      Vue,
      attachProps: true
    })
  ]
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
