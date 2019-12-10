import Vue from "vue";
import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import Vuelidate from "vuelidate";
import { iconsSet as icons } from "./assets/icons/icons.js";

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.use(Vuelidate);

new Vue({
  el: "#app",
  router,
  icons,
  template: "<App/>",
  components: {
    App
  }
});
