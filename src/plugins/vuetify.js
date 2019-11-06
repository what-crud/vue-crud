import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import Vuetify from 'vuetify/lib'
import main from '@/config/main'
import 'tiptap-vuetify/dist/main.css'

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
    locales: main.vuetifyLocales,
    current: main.defaultLocale,
  },
})

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'md',
})

export default vuetify
