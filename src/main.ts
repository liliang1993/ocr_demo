import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";

import VConsole from "vconsole";
const vConsole: any = new VConsole();
Vue.use(vConsole);

import { getWxConfig } from "@/utils";
Vue.prototype.$getWxConfig = getWxConfig;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
