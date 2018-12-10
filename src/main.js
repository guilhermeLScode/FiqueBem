import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';
import * as VueGoogleMaps from "vue2-google-maps";
import store from "./store";
import "./registerServiceWorker";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyD01OArYwqGm9Ate3XnJEU9-9VdhlonhRc",
  }
});

Vue.prototype.$http = axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
