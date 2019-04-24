import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import colors from "./module/colorTheme";
import constant from "../constant";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "mdi",
  theme: colors
});

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
  render: h => h(App)
}).$mount("#app");
