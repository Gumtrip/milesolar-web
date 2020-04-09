import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './http/index'
Vue.use(VueAxios, axios)
Vue.use(api)
Vue.prototype.$axios = axios

Vue.config.productionTip = false
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
