import Vue from 'vue'
import router from '@/router'

let actions = {
  login({
    commit
  }, credential) {
    Vue.http.post('auth/login', credential)
      .then((response) => response.json())
      .then((result) => {
        commit('login', result);
      });
  },
  logout({
    commit
  }) {
    Vue.http.get('auth/logout')
      .then((response) => response.json())
      .then(() => {
        commit('logout');
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
