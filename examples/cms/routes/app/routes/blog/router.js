import Categories from './routes/categories/Index.vue'
import Posts from './routes/posts/Index.vue'
import PostTags from './routes/post-tags/Index.vue'
import Tags from './routes/tags/Index.vue'

let blogRoutes = [
  {
    path: 'categories',
    name: 'blog-categories',
    component: Categories,
  },
  {
    path: 'posts',
    name: 'blog-posts',
    component: Posts,
  },
  {
    path: 'post-tags',
    name: 'blog-post-tags',
    component: PostTags,
  },
  {
    path: 'tags',
    name: 'blog-tags',
    component: Tags,
  },
]

export default blogRoutes
