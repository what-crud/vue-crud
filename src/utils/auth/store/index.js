import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

let auth = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default auth
