import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import store from './store'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Vuex from 'vuex'
Vue.use(Antd);
Vue.use(Vuex);

Vue.config.productionTip = false
Vue.prototype.$axios = axios

sync(store, router)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
