import Vue from 'vue'
import i18n from './locales/index'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/http'
import './plugins/ie'
import './plugins/custom/'
import App from './App.vue'

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

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
