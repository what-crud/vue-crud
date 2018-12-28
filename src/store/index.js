import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

// main store
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// crud
import crud from './modules/crud/'
// auth
import auth from './modules/auth/'

let mainModules = {crud, auth}

import customModules from '@/config/store-modules.js'
const modules = Object.assign(customModules, mainModules);

console.log(modules)
Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  state,
  getters,
  mutations,
  actions
})