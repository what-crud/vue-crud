import Users from './routes/users/Index.vue'
import Permissions from './routes/permissions/Index.vue'
import UserPermissions from './routes/user-permissions/Index.vue'

let administrationRoutes = [
  {
    path: 'users',
    name: 'users',
    component: Users,
  },
  {
    path: 'permissions',
    name: 'permissions',
    component: Permissions,
  },
  {
    path: 'user-permissions',
    name: 'user-permissions',
    component: UserPermissions,
  },
]

export default administrationRoutes
