import Vue from 'vue'
import i18n from './locales/index'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/http'
import './plugins/ie'
import './plugins/custom/'
import App from './App.vue'

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
