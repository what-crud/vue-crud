import 'babel-polyfill'
import Vue from 'vue'
import http from './plugins/http'
import i18n from './locales/index'
import router from './router'
import store from './store'
import './plugins/vuetify'
import './plugins/custom/'
import App from './App.vue'

Vue.config.productionTip = true

Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      store.commit('auth/logout')
      router.push({ path: '/login' })
    }
  })
})

if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
  window.addEventListener('hashchange', function () {
    var currentPath = window.location.hash.slice(1)
    if (router.path !== currentPath) {
      router.push(currentPath)
    }
  }, false)
}

new Vue({
  http,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
