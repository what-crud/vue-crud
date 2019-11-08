import Vue from 'vue'
import Router from 'vue-router'
import App from './routes/app/Index'
import appRoutes from './routes/app/router'
import Login from './routes/login/Index'
import store from '@/store/'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      children: appRoutes,
      beforeEnter: (to, from, next) => {
        var auth = localStorage.getItem('token')
        if (!auth) {
          store.commit('auth/logout')
          next('/login')
        } else {
          Vue.http.get('auth/user')
            .then(response => {
              next()
            }, response => {
              next('/login')
            })
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
})

router.beforeEach(function (to, from, next) {
  let middleware
  store.state.page = null
  to.matched.some(m => {
    middleware = m.meta.guard
  })
  if (typeof middleware === 'undefined') {
    next()
  } else {
    if (store.getters['auth/checkPermission'](middleware)) {
      window.scrollTo(0, 0)
      next()
    } else if (store.getters['auth/isLogged']) {
      next('/home')
    } else {
      next('/login')
    }
  }
})

export default router
