import Vue from 'vue'
import router from '@/router'

let actions = {
  login({ commit }, credential) {
    commit('loginWait', true)
    return new Promise(resolve => {
      Vue.http.post('auth/login', credential)
        .then((response) => response.json())
        .then((result) => {
          commit('login', result)
          resolve()
        })
        .catch(error => {
          commit('loginWait', false)
          commit('loginFailed')
        })
    })
  },
  logout({ commit }) {
    return new Promise(resolve => {
      Vue.http.get('auth/logout')
        .then((response) => response.json())
        .then(() => {
          commit('logout');
          resolve()
        });
    })
  },
  getUser({ commit }) {
    return new Promise(resolve => {
      Vue.http.get('auth/user')
        .then((response) => response.json())
        .then(() => {
          if (response.status === 400 || response.status === 401 || response.status === 403) {
            commit('logout')
          }
          resolve()
        });
    })
  },
  refreshToken({
    commit
  }, data) {
    Vue.http.post('auth/refresh-token')
      .then((response) => response.json())
      .then((result) => {
        commit('refreshToken', result);
      });
  },
  editUser({
    commit
  }, data) {
    Vue.http.post('auth/user', data)
      .then((response) => response.json())
      .then((result) => {
        commit('editUser', result);
      });
  },
  editPassword({
    commit
  }, data) {
    Vue.http.post('auth/user-password', data)
      .then((response) => response.json())
      .then((result) => {
        commit('editPassword', result);
      });
  }
}

export default actions
