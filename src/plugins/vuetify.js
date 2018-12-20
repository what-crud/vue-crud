import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { config } from '@/config.js'

Vue.use(Vuetify, {
  iconfont: config.iconfont,
  theme: config.theme
})
