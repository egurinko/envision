import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "../utils/colorTheme";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: colors,
    },
  }
});
