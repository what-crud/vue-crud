import Vue from 'vue'
import vueResource from 'vue-resource'
import api from '@/config/api'

Vue.use(vueResource)

const prefix = api.path.prefix ? `/${api.path.prefix}` : ''

Vue.http.options.root = `${api.url}${prefix}`
Vue.http.options.emulateJSON = true
