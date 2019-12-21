import Vue from "vue";
import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import Vuelidate from "vuelidate";
import {iconsSet as icons} from "./assets/icons/icons.js";
import store from "./store/store";
import BoostrapVue from 'bootstrap-vue'


Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.use(Vuelidate);
Vue.use(BoostrapVue);

new Vue({
  el: "#app",
  router,
  store,
  icons,
  template: "<App/>",
  components: {
    App
  }
});
