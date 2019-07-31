import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "../module/colorTheme";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: colors,
    },
  },
  icons: {
    iconfont: "mdi",
  },
});