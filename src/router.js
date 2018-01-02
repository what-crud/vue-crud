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
            next('/login')
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
  window.scrollTo(0, 0);
  next()
});

export default router
