import Home from './routes/home/Index.vue'
import Cms from './routes/cms/Index.vue'
import cmsRoutes from './routes/cms/router'
import Blog from './routes/blog/Index.vue'
import blogRoutes from './routes/blog/router'
import Store from './routes/store/Index.vue'
import storeRoutes from './routes/store/router'
import Administration from './routes/administration/Index.vue'
import administrationRoutes from './routes/administration/router'

let appRoutes = [
  {
    path: 'home',
    name: 'home',
    component: Home,
  },
  {
    path: 'cms',
    name: 'cms',
    component: Cms,
    children: cmsRoutes,
    meta: { guard: 'CMS' },
  },
  {
    path: 'blog',
    name: 'blog',
    component: Blog,
    children: blogRoutes,
    meta: { guard: 'BLOG' },
  },
  {
    path: 'store',
    name: 'store',
    component: Store,
    children: storeRoutes,
    meta: { guard: 'STORE' },
  },
  {
    path: 'administration',
    name: 'administration',
    component: Administration,
    children: administrationRoutes,
    meta: { guard: 'ADMIN' },
  },
]

export default appRoutes
