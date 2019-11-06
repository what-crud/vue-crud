import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store/index'

import pl from './pl/index'
import en from './en/index'

Vue.use(VueI18n)

const messages = {
  pl: pl,
  en: en,
}

export default new VueI18n({
  locale: store.getters.lng,
  messages,
})
