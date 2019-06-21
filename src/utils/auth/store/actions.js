import Vue from 'vue'
import api from '@/config/api'
import auth from '@/config/auth'

const getUrl = (url) => {
  let urlArray = []
  if (auth.api){
    urlArray.push(auth.api)
  }
  else {
    urlArray.push(api.url)
    if (api.path.prefix){
      urlArray.push(api.path.prefix)
    }
  }
  if (auth.prefix) {
    urlArray.push(auth.prefix)
  }
  urlArray.push(url)
  return urlArray.join('/')
}

const actions = {
  login ({ commit }, credential) {
    commit('loginWait', true)
    return new Promise((resolve) => {
      Vue.http.post(getUrl('login'), credential)
        .then(response => response.json())
        .then((result) => {
          commit('login', result)
          resolve()
        })
        .catch(() => {
          commit('loginWait', false)
          commit('loginFailed')
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.post(getUrl('logout'))
        .then(response => response.json())
        .then(() => {
          commit('logout')
          resolve()
        })
    })
  },
  getUser ({ commit }) {
    return new Promise((resolve) => {
      Vue.http.get(getUrl('user'))
        .then(response => response.json())
        .then((response) => {
          if ([400, 401, 403].includes(response.status)) {
            commit('logout')
          }
          resolve()
        })
    })
  },
  refreshToken ({
    commit
  }, data) {
    Vue.http.post(getUrl('refresh-token'))
      .then(response => response.json())
      .then((result) => {
        commit('refreshToken', result)
      })
  },
  editUser ({
    commit,
    dispatch
  }, data) {
    Vue.http.post(getUrl('user'), data)
      .then(response => {
        let result = response.json()
        commit('editUser', result)
      }, (error) => {
        dispatch('openAlertBox', ['alertError', error.statusText], { root: true })
      })
  },
  editPassword ({
    commit,
    dispatch
  }, data) {
    Vue.http.post(getUrl('user-password'), data)
      .then(response => {
        let result = response.json()
        commit('editPassword', result)
      }, (error) => {
        dispatch('openAlertBox', ['alertError', error.statusText], { root: true })
      })
  }
}

export default actions
