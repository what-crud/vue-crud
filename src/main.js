import "babel-polyfill"
import Vue from 'vue'
import i18n from './locales/index.js'
import './plugins/vuetify'
import './plugins/vue-resource'
import './plugins/custom/'
import App from './App.vue'
import router from './router'
import store from './store'
import './register-service-worker'
import { configApi } from './config/api'

Vue.config.productionTip = false
Vue.http.options.emulateJSON = true;
Vue.http.options.root = configApi.url + configApi.path.default
Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      store.commit('auth/logout')
      router.push({path: '/login'})
    }
  })
})

if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
  window.addEventListener("hashchange", function(event) {
    var currentPath = window.location.hash.slice(1);
    if (router.path !== currentPath) {
      router.push(currentPath)
    }
  }, false)
}

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
