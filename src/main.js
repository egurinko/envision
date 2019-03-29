import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import colors from "vuetify/es5/util/colors";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "mdi",
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
