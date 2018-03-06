import Vue from 'vue'
import router from '@/router'

let actions = {
    // table data
    getItems({commit, state}) {
      Vue.http.get(state.prefix + '/' + state.path)
        .then((response) => commit('setItems', response.body))
    },
    // item details
    getItem({commit, state}, [id]) {
      Vue.http.get(state.prefix + '/' + state.path + '/' + id)
        .then((response) => commit('setItem', response.body))
    },
    updateItem({commit, dispatch, state}, [id, params, successText, errorText]) {
      Vue.http.put(state.prefix + '/' + state.path + '/' + id, params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItems', [state.prefix, state.path])
        })
    },
    storeItem({commit, dispatch, state}, [params, successText, errorText]) {
      Vue.http.post(state.prefix + '/' + state.path, params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          if(state.createdElement.mode == 'inform'){
            commit('setCreatedItemStatus', [true, response.body.id])
          }
          dispatch('getItems', [state.prefix, state.path])
        })
    },
    deleteItem({commit, dispatch, state}, [id, successText, errorText]) {
      Vue.http.delete(state.prefix + '/' + state.path + '/' + id)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItems', [state.prefix, state.path])
        })
    },
    mulitipleItemsUpdate({commit, dispatch, state}, [params, successText, errorText]){
      Vue.http.post(state.prefix + '/' + state.path + '/multiple-update', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItems', [state.prefix, state.path])
        })
    },
    mulitipleItemsDelete({commit, dispatch, state}, [ids, successText, errorText]){
      Vue.http.post(state.prefix + '/' + state.path + '/multiple-delete', ids)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItems', [state.prefix, state.path])
        })
    },
    // item elements
    getItemElements({commit, state}) {
      let url = state.itemElements.url.replace('{id}', state.itemElements.id);
      Vue.http.get(url)
        .then((response) => commit('setItemElements', response.body))
    },
    addItemElement({commit, dispatch, state}, [params, successText, errorText]) {
      Vue.http.post(state.itemElements.controller, params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItemElements')
        })
    },
    removeItemElement({commit, dispatch, state}, [id, successText, errorText]) {
      Vue.http.delete(state.itemElements.controller + '/' + id)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItemElements')
        })
    },
    addManyItemElements({commit, dispatch, state}, [params, successText, errorText]) {
      Vue.http.post(state.itemElements.controller + '/multiple-add', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItemElements')
        })
    },
    removeManyItemElements({commit, dispatch, state}, [ids, successText, errorText]) {
      Vue.http.post(state.itemElements.controller + '/multiple-delete', ids)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItemElements')
        })
    },
}

export default actions
