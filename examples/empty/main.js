import Vue from 'vue'
import i18n from './locales/index'
import router from './router'
import store from './store'
import http from './plugins/http'
import './plugins/vuetify'
import './plugins/ie'
import './plugins/custom/'
import App from './App.vue'

Vue.config.productionTip = true

new Vue({
  http,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
