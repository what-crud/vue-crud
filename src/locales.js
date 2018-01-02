import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  pl: {
  },
  en: {
  }
}

export default new VueI18n({
  locale: 'pl',
  messages,
})
