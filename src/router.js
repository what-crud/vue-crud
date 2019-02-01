import Vue from 'vue'
import Router from 'vue-router'
import Main from './routes/main/Index'
import mainRoutes from './routes/main/router.js'
import Login from './routes/login/Index'
import store from '@/store/'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'main',
      component: Main,
      children: mainRoutes,
      beforeEnter: (to, from, next) => {
        var auth = localStorage.getItem('token')
        if (!auth){
            store.commit('auth/logout')
            next('/login')
        }
        else {
          Vue.http.get('auth/user')
            .then(response => {
              next()
            }, response => {
              next('/login')
            });
          //store.dispatch('auth/getUser').then(next())
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

router.beforeEach(function (to, from, next) {
  let middleware
  store.state.page = null
  to.matched.some(m => middleware = m.meta.guard)
  if(typeof middleware === "undefined") {
    next()
  } 
  else{
    if(store.getters['auth/checkPermission'](middleware)){
      window.scrollTo(0, 0);
      next()
    }
    else if (store.getters['auth/isLogged']) {
      next('/home')
    }
    else{
      next('/login')
    }
  }
});

export default router
