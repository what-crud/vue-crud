import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { main } from '@/config/main.js'

Vue.use(Vuetify, {
  theme: main.theme
})
