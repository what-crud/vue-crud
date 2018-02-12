import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

//crud
import crud from './modules/crud/'
//modules
import administration from './modules/administration/'
import auth from './modules/auth/'
import crm from './modules/crm/'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const modules = {
  //crud
  crud: crud,
  //modules
  administration: administration,
  auth: auth,
  crm: crm,
}

export default new Vuex.Store({
  modules,
  state,
  getters,
  mutations,
  actions
})