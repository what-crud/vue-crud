import "babel-polyfill"
import Vue from 'vue'
import i18n from './locales/index.js'
import router from '@/router'
import vueResource from 'vue-resource'
import store from '@/store/'
import Vuetify from 'vuetify'
import App from '@/App'
import { config } from '@/config.js'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#34495e',
    secondary: '#41b883',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
Vue.use(vueResource)

Vue.http.options.emulateJSON = true;
// copy config.js.example to config.js and customize api configuration
Vue.http.options.root = config.api.url + config.api.path.default

if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) { // detect it's IE11
  window.addEventListener("hashchange", function(event) {
    var currentPath = window.location.hash.slice(1);
    if (router.path !== currentPath) {
      router.push(currentPath)
    }
  }, false)
}

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
});

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
