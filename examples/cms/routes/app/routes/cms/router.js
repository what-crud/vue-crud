import Messages from './routes/messages/Index.vue'
import Settings from './routes/settings/Index.vue'
import MenuItems from './routes/menu-items/Index.vue'

let cmsRoutes = [
  {
    path: 'messages',
    name: 'cms-messages',
    component: Messages,
  },
  {
    path: 'settings',
    name: 'cms-settings',
    component: Settings,
  },
  {
    path: 'menu-items',
    name: 'cms-menu-items',
    component: MenuItems,
  },
]

export default cmsRoutes
