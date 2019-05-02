import Home from './routes/home/Index.vue'
import Administration from './routes/administration/Index.vue'
import administrationRoutes from './routes/administration/router'

let appRoutes = [
  {
    path: 'home',
    name: 'home',
    component: Home
  },
  {
    path: 'administration',
    name: 'administration',
    component: Administration,
    children: administrationRoutes,
    meta: { guard: 'ADMIN' }
  }
]

export default appRoutes
