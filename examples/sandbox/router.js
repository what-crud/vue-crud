import Vue from 'vue'
import Router from 'vue-router'
import Crud from './routes/Crud.vue'
import App from './routes/App.vue'
import Login from './routes/Login.vue'
import Logged from './routes/Logged.vue'

import store from '@/store/'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/crud',
      name: 'crud',
      component: Crud,
    },
    {
      path: '/app',
      name: 'app',
      component: App,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        var auth = localStorage.getItem('token')
        if (auth) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/',
      name: 'logged',
      component: Logged,
      beforeEnter: (to, from, next) => {
        var auth = localStorage.getItem('token')
        if (!auth) {
          store.commit('auth/logout')
          next('/login')
        } else {
          Vue.http.get('auth/user')
            .then(() => {
              next()
            }, () => {
              next('/login')
            })
        }
      },
    },
  ],
})

export default router
