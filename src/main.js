import "babel-polyfill"
import Vue from 'vue'
import i18n from './locales/index.js'
import router from '@/router'
import vueResource from 'vue-resource'
import store from '@/store/'
import Vuetify from 'vuetify'
import App from '@/App'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(vueResource)

Vue.http.options.emulateJSON = true;
Vue.http.options.root = 'http://127.0.0.1:8000/api';

Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      store.commit('auth/logout')
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
