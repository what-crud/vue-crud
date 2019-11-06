import Vue from 'vue'
import Vuex from 'vuex'

// main store
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
// crud
import crud from '@/utils/crud/store/'
// auth
import auth from '@/utils/auth/store/'
// app
import app from '@/utils/app/store/'

import customModules from '@/config/store-modules'

const mainModules = { crud, auth, app }
const modules = Object.assign(customModules, mainModules)

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state,
  getters,
  mutations,
  actions,
})
