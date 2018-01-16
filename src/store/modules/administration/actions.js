import Vue from 'vue'
import router from '@/router'

const prefix = 'admin/'

let actions = {
    // permissions
    getPermissions({commit}) {
      Vue.http.get(prefix + 'permissions')
        .then((response) => commit('permissionsList', response.body))
    },
    getPermission({commit}, id) {
      Vue.http.get(prefix + 'permissions/' + id)
        .then((response) => commit('permission', response.body))
    },
    updatePermission({commit, dispatch}, [id, params]) {
      Vue.http.put(prefix + 'permissions/' + id, params)
        .then((response) => dispatch('getPermissions'))
    },
    storePermission({commit, dispatch}, params) {
      Vue.http.post(prefix + 'permissions', params)
        .then((response) => dispatch('getPermissions'))
    },
    // user permissions
    getUserPermissions({commit}) {
      Vue.http.get(prefix + 'user-permissions')
        .then((response) => commit('userPermissionsList', response.body))
    },
    // users
  }
  
  export default actions