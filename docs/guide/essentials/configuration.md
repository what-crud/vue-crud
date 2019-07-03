---
sidebarDepth: 2
---

# Configuration

## Adding configuration files

In order for your project to communicate with your own API and to customize the appearance, basic functions and language versions of the application, you must first configure your project. The necessary files can be found in the **examples/`example`/config** folder.

### API configuration
Create **api.js** file in **src/config** directory. You may use template located in **examples/`example`/config/api.js**. Here you can configure the parameters needed to connect to the API.

#### src/config/api.js:

```js
export default {
    url: 'http://crm-api.id-a.pl/',
    path: {
        default: 'api',
        storage: 'storage/',
        upload: 'files/file-upload'
    }
}
```

Parameters:
- `url` - Your API domain, eg. http://127.0.0.1:8000/
- `path.default` - path to API on defined domain. The 'api' value means that appplication will be request to address: http://127.0.0.1:8000/api
- `path.storage` - path to file storage on defined domain
- `path.upload` - path to file upload system

If you don't have prepared your own API yet, you can use default configuration first and connect to the API located at the address: http://crm-api.id-a.pl/

### Project configuration
The **examples/`example`/config** folder also contains the **main.js** file. Copy it to **src/config** and adapt it to the needs of your project.

#### src/config/main.js:

``` js
export default {
    title: "Vue CRUD",
    locales: [{
            name: 'en',
            text: 'English'
        },
        {
            name: 'pl',
            text: 'Polski'
        },
    ],
    defaultLocale: 'en',
    primaryTheme: 'dark',
    secondaryTheme: 'dark',
    theme: {
        primary: '#34495e',
        secondary: '#41b883',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
}
```

Parameters:
- `title` - Your project title. It will be visible on toolbar and browser's tab.
- `locales` - List of language versions available in your application.
- `defaultLocale` - Default locale.
- `localeSelectable` - If true, user will be able to choose the language version on the login page and after logging in.
- `theme` - object of themes' colours used by Vuetify. See <a href="https://vuetifyjs.com/en/style/theme#customizing" target="_blank">documentation</a>.
- `primaryTheme`, `secondaryTheme` - Information on whether the theme is dark or light. Possible values are 'dark' or ''.

### CRUD
Create **crud.js** file in **src/config** directory. You may use template located in **examples/`example`/config/crud.js**. Here you can set default CRUD configuration and add functions for custom display table fields.

#### src/config/crud.js:

```js
export default {
  activityColumnName: 'active',
  primaryKey: 'id',
  deleteMode: 'soft',
  editButton: true,
  createMode: true,
  editMode: true,
  mainFilter: true,
  fieldFilter: true,
  exportButton: true,
  refreshButton: true,
  selectManyMode: true,
  updateManyMode: true,
  removeManyMode: true,
  fieldModifiers: {
    dateFromTimestamp: (param) => {
        return param.substring(0, 10)
    },
    timeFromTimestamp: (param) => {
        let tmp = param || ''
        return tmp.substring(0, 5)
    },
    datetimeFromTimestamp: (param) => {
        return '<nobr>' + param.substring(0, 19) + '</nobr>'
    },
    croppedText: (param) => {
        return (param == null || param.length < 100) ? param : param.substring(0, 100) + '...'
    },
    list: (param) => {
        return param ? param.map(obj => obj.tableList).join(', ') : ''
    },
    listTasks: (param) => {
        return param ? param.map(obj => {
            return obj.task.name
        }).join('<br>') : ''
    },
    lastReset: (param) => {
        if (param.length > 0) {
            return '<nobr>' + param[param.length - 1].reset_time.substring(0, 19) + '</nobr>'
        }
    }
  }
}
```

Parameters:
- `activityColumnName` - default: *'active'* - default CRUD.vue component's `activityColumnName` property value,
- `primaryKey` - default: *'id'* - default CRUD.vue component's `primaryKey` property value,
- `deleteMode` - default: *'soft'* - default CRUD.vue component's `deleteMode` property value,
- `editButton` - default: *true* - default CRUD.vue component's `editButton` property value,
- `createMode` - default: *true* - default CRUD.vue component's `createMode` property value,
- `editMode` - default: *true* - default CRUD.vue component's `editMode` property value,
- `mainFilter` - default: *true* - default CRUD.vue component's `mainFilter` property value,
- `fieldFilter` - default: *true* - default CRUD.vue component's `fieldFilter` property value,
- `exportButton` - default: *true* - default CRUD.vue component's `exportButton` property value,
- `refreshButton` - default: *true* - default CRUD.vue component's `refreshButton` property value,
- `selectManyMode` - default: *true* - default CRUD.vue component's `selectManyMode` property value,
- `updateManyMode` - default: *true* - default CRUD.vue component's `updateManyMode` property value,
- `removeManyMode` - default: *true* - default CRUD.vue component's `removeManyMode` property value,
- `fieldModifiers` - default: *{}* - Object with list of functions modifying the contents of fields in the table

### Authentication
Create **auth.js** file in **src/config** directory. You may use template located in **examples/`example`/config/auth.js**. Here you can set default authentication configuration.

#### src/config/auth.js:

```js
```

Parameters:

### Custom store (Vuex) modules
Create **store-modules.js** file in **src/config** directory. You may use template located in **examples/`example`/config/store-modules.js**. Here you can add your own modules to the Vuex store.

#### src/config/store-modules.js:

```js
// custom modules
import customModule from '@/routes/main/routes/custom-module/store/'

export default {
  customModule
}
```

## Preparing the project

The last step before running the application is to add the **public** folder, language versions and application modules with the router to your project. All necessary files can be found in the **examples** folder. First, you can add these files without modifications to serve projects and then start with your customization.

### **Public folder**
Copy **examples/`example`/public** folder with the content to your project main directory. In this folder you can customize eg. your index.html, favicon or robots.txt file.

### Main file
Create **main.js** file in **src** directory. This file should look like that:

```js
import Vue from 'vue'
import i18n from './locales/index'
import router from './router'
import store from './store'
import http from './plugins/http'
import './plugins/vuetify'
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
  http,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

### **Locales**
Copy **examples/`example`/locales** content to the **src/locales**. Here you can define translations for locales used in your project. The contents of the folder should look like:

```
.
├─ index.js
├─ en
│  ├─ index.js
│  ├─ alerts.js
│  ├─ login.js
│  └─ routes.js
├─ locale2
│  ├─ index.js
│  ├─ alerts.js
│  ├─ login.js
│  └─ routes.js
└─ locale3
   ├─ index.js
   ├─ alerts.js
   ├─ login.js
   └─ routes.js
```
Then your **src/locales/index.js** file will look like this:
```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store/index.js'

import en from './en/index.js'
import locale2 from './locale2/index.js'
import locale3 from './locale3/index.js'

Vue.use(VueI18n)

const messages = {
  en: en,
  locale2: locale2,
  locale3: locale3,
}

export default new VueI18n({
  locale: store.getters.lng,
  messages,
})
```

### **Routes**
The last step is add some modules to your project. To do this, copy **routes** directory and **router.js** file from the **examples/`example`** folder to the **src** location.

Then your **src/router.js** file will look like this:

```js
import Vue from 'vue'
import Router from 'vue-router'
// import here your pages and child routers, e.g.:
// import App from './routes/app/Index'
// import appRoutes from './routes/app/router.js'

Vue.use(Router)

const router = new Router({
  routes: [
    // your routes
  ]
})

export default router
```

## Running the project
Now, when your project is ready, you can serve it in dev mode:
```
yarn serve
#or
npm run serve
```
...or build it:
```
yarn build
#or
npm run build
```

