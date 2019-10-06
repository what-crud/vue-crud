import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import main from '@/config/main'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: main.theme
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
