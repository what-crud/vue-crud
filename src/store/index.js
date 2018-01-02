import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import administration from './modules/administration/'
import auth from './modules/auth/'
import crm from './modules/crm/'
import wholesalers from './modules/wholesalers/'
import pharmacies from './modules/pharmacies/'
import hospitals from './modules/hospitals/'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const modules = {
  administration: administration,
  auth: auth,
  crm: crm,
  wholesalers: wholesalers,
  pharmacies: pharmacies,
  hospitals: hospitals
}

export default new Vuex.Store({
  modules,
  state,
  getters,
  mutations,
  actions
})
