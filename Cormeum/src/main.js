import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import Vuetify from "vuetify";

import router from "./router";

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
