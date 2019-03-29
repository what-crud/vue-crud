import Vue from 'vue'
import vueResource from 'vue-resource'
import store from './store'

Vue.use(vueResource)

Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
  }
  next((response) => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      store.dispatch('logout')
    }
  })
})
