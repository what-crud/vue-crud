import Vue from 'vue'
import router from '@/router'

let actions = {
    getPermissions({commit}) {
      Vue.http.get('permissions')
        .then((response) => commit('setPermissions', response.body))
    }
  }
  
  export default actions