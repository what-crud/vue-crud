---
sidebarDepth: 2
---

# Creating own modules

In addition to the Home and Administration modules, you can create modules according to your needs. The new module should be created in the src/routes/main/routes/ folder. Create there new folder (eg. 'custom-module') and link it in main router (**src/**)

## Module structure

Once you've created a new module, add the necessary files to it:
#### Example content of module folder:
```
.
├─ Index.vue
├─ router.js
├─ store
│  ├─ index.js
│  ├─ state.js
│  ├─ getters.js
│  ├─ mutations.js
│  └─ actions.js
└─ routes
    ├─ custom-link-1
    |  └─ Index.vue
    ├─ custom-link-2
    |  └─ Index.vue
    └─ custom-link-3
        └─ Index.vue
```

### Index.vue

Core of your module is **Index.vue** file. This file doesn't have to, but can be a nested router to the right target locations. Then it will look just like this:

``` html
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    mapMutations,
  } from 'vuex'

  export default {
    created () {
      this.setModule('crm.name')
    },
    methods: {
      ...mapMutations([
        'setModule'
      ]),
    },
  }

</script>
```

### Routes

In the **routes** folder you may place your module's target locations. According to the convention, you should create a separate folder on each route, and put inside Index.vue file (and whatever you want).

### Router

The **router.js** file is simple Vue nested router, when you can link your module's links. Example:
```js
import CustomLink1 from './routes/custom-link-1/Index.vue'
import CustomLink2 from './routes/custom-link-2/Index.vue'
import CustomLink3 from './routes/custom-link-3/Index.vue'

let customModuleRoutes = [
    {
        path: 'custom-link-1',
        name: 'custom-link-1',
        component: CustomLink1,
    },
    {
        path: 'custom-link-2',
        name: 'custom-link-2',
        component: CustomLink2,
    },
    {
        path: 'custom-link-3',
        name: 'custom-link-3',
        component: CustomLink3,
    },
];

export default customModuleRoutes;
```

### Store

Module's store is an optional thing. CRUD's store is placed in **src/store/modules/crud** so you don't have do create your own store. But if you want create some new feature in the module and if you need to use Vuex for this purpose, create store folder in the module and export it in **src/config/store-modules.js** file:

#### ./store/state.js:

```js
let state = {
  // put your state here
}
export default state
```

#### ./store/getters.js:

```js
let getters = {
  // put your getters here
}

export default getters
```

#### ./store/mutations.js:

```js
let mutations = {
  // put your mutations here
}
export default mutations
```

#### ./store/actions.js:

```js
let actions = {
  // put your actions here
}
export default actions
```

#### ./store/index.js:

```js
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

let customModule /* put your module's name here */ = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default customModule /* put your module's name here */
```

To connect your store to a global vuex store, you need to modify the **src/config/store-modules.js** file:

#### src/config/store-modules.js:

```js
// predefined modules (but not required)
import administration from '@/routes/main/routes/administration/store/'
import crm from '@/routes/main/routes/crm/store/'
// custom modules
import customModule from '@/routes/main/routes/custom-module/store/'

export default {
    administration,
    crm,
    customModule
}
```

## Guard
If you want the display of a given module to depend on the user's rights, you can create a guard for this module. For this purpose, you must configure the response returned by the API after logging in (see the API documentation section for instructions). In app's Local Storage will be defined `user` object and there will be `user_permissions` array:

#### localStorage -> `user.user_permissions`:
```js
[
    {
        // permission 1 data
    },
    {
        // permission 2 data
    },
    // ...
    {
        // permission i data
        permission: {
            // some data
            code: 'customModuleCode' /* custom module guard code */
        }
    }
]
```

If you have different API logic, you can modify `checkRole` getter in **src/store/modules/auth/getters.js** file.

Then, add guard to the module's route object in **src/routes/main/router.js** file:

```js
let mainRoutes = [
    // ...
    {
        // your custom module
        path: 'custom-module',
        name: 'custom-module',
        component: CustomModule,
        children: customModuleRoutes, /* if module has child routes */
        meta: {guard: 'customModuleCode'} /* guard name */
    },
    // ...
]
```