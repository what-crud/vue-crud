import Vue from 'vue'
import Router from 'vue-router'
import Crud from './routes/Crud.vue'
import App from './routes/App.vue'
import Login from './routes/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/crud',
      name: 'crud',
      component: Crud
    },
    {
      path: '/app',
      name: 'app',
      component: App
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
