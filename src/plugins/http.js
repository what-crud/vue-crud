import Vue from 'vue'
import vueResource from 'vue-resource'
import api from '@/config/api'

Vue.use(vueResource)

Vue.http.options.emulateJSON = true
Vue.http.options.root = api.url + api.path.default

const http = {
  root: api.url + api.path.default,
  emulateJSON: true
}

export default http
