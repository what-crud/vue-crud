import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { configParams } from '@/config/params.js'

Vue.use(Vuetify, {
  iconfont: configParams.iconfont,
  theme: configParams.theme
})
