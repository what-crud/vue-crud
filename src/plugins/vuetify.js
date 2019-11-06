import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import Vuetify from 'vuetify/lib'
import main from '@/config/main'
import vuetifyLocales from '@/locales/vuetify'
import 'tiptap-vuetify/dist/main.css'
import store from '@/store/index'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: main.theme,
    },
  },
  icons: {
    iconfont: 'md',
  },
  lang: {
    locales: vuetifyLocales || {},
    current: store.getters.lng,
  },
})

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'md',
})

export default vuetify
