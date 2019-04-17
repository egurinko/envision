import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import colors from "./module/colorTheme";
import constant from "../constant";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "mdi",
  theme: colors
});

Vue.prototype.$constant = constant;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
