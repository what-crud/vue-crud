import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

//crud
import crud from './modules/crud/'

// auth

import auth from './modules/auth/'

//modules
import administration from '@/routes/main/routes/administration/store/'
import crm from '@/routes/main/routes/crm/store/'

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