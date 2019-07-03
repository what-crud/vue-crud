# Getting started

The first thing you need to do is decide how your application looks. You have to ask yourself such questions:
- will the application require a login?
- if login will be done, should the user be able to edit their data, passwords, etc.?
- do I want to use the built-in layout, do I want to build my own?
- whether the application will be modular or all content will be available to everyone?

Answering these questions depends on how you will have to approach building the application.

However, regardless of this, you will always have to do some basic tasks:

### API configuration

You have to configure your **src/config/api.js** because without it the basic function of Vue CRUD will not work, i.e. table management (and authentication too).
If you want to create file management feature in your app, your file should look like that (depending on your real paths):

```js
export const api = {
    url: 'http://localhost:8000/',
    path: {
        default: 'api',
        storage: 'storage/',
        upload: 'files/file-upload'
    }
}
```
otherwise it will be enough:

```js
export const api = {
    url: 'http://localhost:8000/',
    path: {
        default: 'api',
    }
}
```

or:

```js
export const api = {
    url: 'http://localhost:8000/api'
}
```

If you do not want to, you may not fill in this file at all, but then you will have to provide the full URL of the request for each component that uses the API.

The first place where parameters from this file are used is the file **src/main.js** (project root). Of course, you can theoretically enter whatever you like into this file, but you have not downloaded Vue CRUD to create everything from scratch. Typically, the file will look something like this:

```js
import "babel-polyfill"
import Vue from 'vue'
import i18n from './locales/index.js'
import './plugins/vuetify'
import './plugins/vue-resource'
import './plugins/custom/'
import App from './App.vue'
import router from './router'
import store from './store'
import './register-service-worker'
import { api } from './config/api'

Vue.config.productionTip = false
Vue.http.options.emulateJSON = true;
Vue.http.options.root = api.url + api.path.default
Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      store.commit('auth/logout')
      router.push({path: '/login'})
    }
  })
})

if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
  window.addEventListener("hashchange", function(event) {
    var currentPath = window.location.hash.slice(1);
    if (router.path !== currentPath) {
      router.push(currentPath)
    }
  }, false)
}

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

Let's a look for this code:

```js
import Vue from 'vue'
import './plugins/vue-resource'
import { api } from './config/api'

Vue.http.options.root = api.url + api.path.default

Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      store.commit('auth/logout')
      router.push({path: '/login'})
    }
  })
})
```

The initial configuration of communication with the API has been defined here.

`Vue.http.options.root` - root url for each request. Thanks to this parameter, you will no longer need to add your api domain to each request.
`Vue.http.interceptors` - list of request interceptors. In this example interceptor with **Authorization: Bearer `token`** header has been created. This interceptor has to authenticate each request and force logout if request doesn't pass authentication

So, if your app doesn't require authentication, you can this code:

```js
Vue.http.interceptors.push((request, next) => {
  // ...
})
```

### Main routing

You do not need to use routing in your project. If your application is extremely simple, you can create your code directly in your root .vue file:

**main.js**:
```js
import Vue from 'vue'
import './plugins/vuetify'
import YourComponent from './YourComponent.vue'

new Vue({
  render: h => h(YourComponent)
}).$mount('#app')
```

**YourComponent.vue**:
```vue
<template>
  <div id="app">
    ...
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
```

But if you want to use routing, add it in the **main.js** file:

```js
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
  window.addEventListener("hashchange", function(event) {
    var currentPath = window.location.hash.slice(1);
    if (router.path !== currentPath) {
      router.push(currentPath)
    }
  }, false)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

Then create the router.js file with your first route:

**src/router.js**:
```js
import Vue from 'vue'
import Router from 'vue-router'
import Crud from './routes/Crud.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'crud',
      component: Crud
    },
  ]
})

export default router
```

**src/routes/Crud.vue**:
```vue
<template>
  ...
</template>

<script>
  import Crud from '@/utils/crud/components/Crud.vue'

  export default {
    // ...
  }
</script>
```


