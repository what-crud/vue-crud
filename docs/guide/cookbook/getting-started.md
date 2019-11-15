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
import Vue from 'vue'
import i18n from './locales/index'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import './plugins/http'
import './plugins/ie'
import './plugins/custom/'
import App from './App.vue'

Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      store.commit('auth/logout')
      router.push({ path: '/login' })
    }
  })
})

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
```

Let's a look for this code:

```js
import Vue from 'vue'
import router from './router'
import store from './store'
import './plugins/http'

Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      store.commit('auth/logout')
      router.push({ path: '/login' })
    }
  })
})
```

The initial configuration of communication with the API has been defined here.

`Vue.http.interceptors` - list of request interceptors. In this example interceptor with **Authorization: Bearer `token`** header has been created. This interceptor has to authenticate each request and force logout if request doesn't pass authentication

So, if your app doesn't require authentication, you don't have to type this code:

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
import vuetify from './plugins/vuetify'
import YourComponent from './YourComponent.vue'

new Vue({
  vuetify,
  render: h => h(YourComponent)
}).$mount('#app')
```

**YourComponent.vue**:
``` html
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
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './plugins/ie'

new Vue({
  router,
  vuetify,
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
``` html
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


