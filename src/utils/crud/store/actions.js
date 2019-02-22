import Vue from 'vue'
import router from '@/router'

let actions = {
    // table data
    getItems({commit, state, getters}) {
      commit('setLoadingStatus', true)
      Vue.http.get(getters.path)
        .then((response) => {
          commit('setItems', response.body)
          commit('setLoadingStatus', false)
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    getItemsServerSide({commit, state, getters}, [params]) {
      return new Promise((resolve, reject) => {
        commit('setLoadingStatus', true)
        Vue.http.post(getters.path + '/search', params)
          .then((response) => {
            commit('setItemsServerSide', response.body)
            resolve()
          }), error => {
            commit('alertError', error.statusText, { root: true })
          }
      })
    },
    // item details
    getItem({commit, state, getters}, [id]) {
      return new Promise((resolve, reject) => {
        commit('setDetailsLoader', true)
        Vue.http.get(getters.path + '/' + id)
          .then((response) => {
            commit('setItem', response.body)
            commit('setDetailsLoader', false)
            resolve()
          }), error => {
            commit('alertError', error.statusText, { root: true })
          }
      })
    },
    updateItem({commit, dispatch, state, getters}, [id, params, successText, errorText]) {
      return new Promise((resolve, reject) => {
        Vue.http.put(getters.path + '/' + id, params)
          .then((response) => {
            if (response.body.status == 0) {
              commit('alertSuccess', successText, { root: true })
              commit('refreshTable')
              resolve()
            }
            else if (response.body.status == -1) {
              commit('alertError', response.body.msg, { root: true })
            }
            else if (response.body.status == -2) {
              commit('alertValidationError', response.body.msg, { root: true })
            }
          }, error => {
            commit('alertError', error.statusText, { root: true })
          })
      })
    },
    storeItem({commit, dispatch, state, getters}, [params, successText, errorText]) {
      return new Promise((resolve, reject) => {
        Vue.http.post(getters.path, params)
          .then((response) => {
            if (response.body.status == 0) {
              commit('alertSuccess', successText, { root: true })
              commit('refreshTable')
              resolve()
            }
            else if (response.body.status == -1) {
              commit('alertError', response.body.msg, { root: true })
            }
            else if (response.body.status == -2) {
              commit('alertValidationError', response.body.msg, { root: true })
            }
            if(state.createdElement.mode == 'inform'){
              commit('setCreatedItemStatus', [true, response.body.id])
            }
          }, error => {
            commit('alertError', error.statusText, { root: true })
          });
      })
    },
    deleteItem({commit, dispatch, state, getters}, [id, successText, errorText]) {
      Vue.http.delete(getters.path + '/' + id)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          commit('refreshTable')
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    mulitipleItemsUpdate({commit, dispatch, state, getters}, [params, successText, errorText]){
      Vue.http.post(getters.path + '/multiple-update', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          commit('refreshTable')
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    mulitipleItemsDelete({commit, dispatch, state, getters}, [ids, successText, errorText]){
      Vue.http.post(getters.path + '/multiple-delete', ids)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          commit('refreshTable')
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    // item elements
    getItemElements({commit, state, getters}) {
      let url = state.itemElements.url.replace('{id}', state, getters.itemElements.id);
      Vue.http.get(url)
        .then((response) => commit('setItemElements', response.body))
    },
    addItemElement({commit, dispatch, state, getters}, [params, successText, errorText]) {
      Vue.http.post(state.itemElements.controller, params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItemElements')
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    removeItemElement({commit, dispatch, state, getters}, [id, successText, errorText]) {
      Vue.http.delete(state.itemElements.controller + '/' + id)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItemElements')
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    addManyItemElements({commit, dispatch, state, getters}, [params, successText, errorText]) {
      Vue.http.post(state.itemElements.controller + '/multiple-add', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItemElements')
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    removeManyItemElements({commit, dispatch, state, getters}, [ids, successText, errorText]) {
      Vue.http.post(state.itemElements.controller + '/multiple-delete', ids)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getItemElements')
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    // extented details
    getItemDetails({commit, state, getters}, [id]) {
      return new Promise((resolve, reject) => {
        commit('setDetailsLoader', true)
        Vue.http.get(getters.path + '/' + id)
          .then((response) => {
            commit('itemDetails', response.body)
            commit('setDetailsLoader', false)
            resolve()
          }), error => {
            commit('alertError', error.statusText, { root: true })
          }
      })
    },
    updateItemDetail({commit, dispatch, state, getters}, [id, params, successText]) {
      Vue.http.put(getters.path + '/' + id, params)
        .then((response) => {
          if (response.body.status == 0) {
            commit('alertSuccess', successText, { root: true })
          }
          else if (response.body.status == -1) {
            commit('alertError', response.body.msg, { root: true })
          }
          else if (response.body.status == -2) {
            commit('alertValidationError', response.body.msg, { root: true })
          }
          dispatch('getItemDetails', [state.item[state.itemIdColumn]])
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    // child details
    updateChild({commit, dispatch, state, getters}, [id, params, successText, path]) {
      return new Promise((resolve, reject) => {
        Vue.http.put(path + '/' + id, params)
          .then((response) => {
            if (response.body.status == 0) {
              commit('alertSuccess', successText, { root: true })
              resolve()
            }
            else if (response.body.status == -1) {
              commit('alertError', response.body.msg, { root: true })
            }
            else if (response.body.status == -2) {
              commit('alertValidationError', response.body.msg, { root: true })
            }
            dispatch('getItemDetails', [state.item[state.itemIdColumn]])
          }, error => {
            commit('alertError', error.statusText, { root: true })
          })
      })
    },
    deleteChild({commit, dispatch, state, getters}, [id, successText, errorText, path]) {
      Vue.http.delete(path + '/' + id)
        .then((response) => {
          if (response.body.status == 0) {
            commit('alertSuccess', successText, { root: true })
          }
          else if (response.body.status == -1) {
            commit('alertError', response.body.msg, { root: true })
          }
          else if (response.body.status == -2) {
            commit('alertValidationError', response.body.msg, { root: true })
          }
          dispatch('getItemDetails', [state.item[state.itemIdColumn]])
        }, error => {
          commit('alertError', error.statusText, { root: true })
        });
    },
    storeChild({commit, dispatch, state, getters}, [params, successText, path]) {
      return new Promise((resolve, reject) => {
        Vue.http.post(path, params)
          .then((response) => {
            if (response.body.status == 0) {
              commit('alertSuccess', successText, { root: true })
              resolve()
            }
            else if (response.body.status == -1) {
              commit('alertError', response.body.msg, { root: true })
            }
            else if (response.body.status == -2) {
              commit('alertValidationError', response.body.msg, { root: true })
            }
            dispatch('getItemDetails', [state.item[state.itemIdColumn]])
          }, error => {
            commit('alertError', error.statusText, { root: true })
          })
      })
    },
    getChild({commit, state, getters}, [id, path, childItemName]) {
      return new Promise((resolve, reject) => {
        Vue.http.get(path + '/' + id)
          .then((response) => {
            commit('setChild', [response.body, childItemName])
            resolve()
          }, error => {
            commit('alertError', error.statusText, { root: true })
          })
      })
    },
}

export default actions
