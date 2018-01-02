import Vue from 'vue'
import router from '@/router'

let actions = {
  login({
    commit
  }, credential) {
    Vue.http.post('auth/login', credential)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        commit('login');
        router.push({
          path: '/'
        });
      });
  },

  logout({
    commit
  }) {
    commit('logout');
    router.push({
      path: '/login'
    });
    Vue.http.get('auth/logout')
      .then((response) => response.json())
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  }
}

export default actions
