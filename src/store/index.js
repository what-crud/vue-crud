import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

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

let mainModules = {crud, auth, app}

import customModules from '@/config/store-modules.js'
const modules = Object.assign(customModules, mainModules);

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  state,
  getters,
  mutations,
  actions
})