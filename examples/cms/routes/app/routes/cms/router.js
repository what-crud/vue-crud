import Messages from './routes/messages/Index.vue'
import Settings from './routes/settings/Index.vue'

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
]

export default cmsRoutes
