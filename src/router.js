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
            next()
        }
        else {
            next()
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
    if(store.getters['auth/checkRole'](middleware)){
      window.scrollTo(0, 0);
      
      Vue.http.post('auth/refresh-token')
        .then((response) => response.json())
        .then((result) => {
          store.commit('auth/refreshToken', result);
          next()
        });
    }
    else{
      next('/home')
    }
  }
});

export default router
