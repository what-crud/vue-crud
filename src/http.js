import Vue from 'vue'
import vueResource from 'vue-resource'
import store from './store'
import api from '.@/config/api'

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

Vue.http.options.emulateJSON = true
Vue.http.options.root = api.url + api.path.default
const http = {
  root: '/root',
  emulateJSON: true,
  headers: {
    Authorization: 'Basic YXBpOnBhc3N3b3Jk'
  },
}

export default http