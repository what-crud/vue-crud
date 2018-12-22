---
sidebarDepth: 2
---

# Configuration

## Adding configuration files

In order for your project to communicate with your own API and to customize the appearance, basic functions and language versions of the application, you must first configure your project. The necessary files can be found in the `templates/config` folder.

### API configuration
Create api.js file in src/config directory. You may use templated located in `templates/config/api.js`. Here you can configure the parameters needed to connect to the API.

#### src/config/api.js:

```js

export const configApi = {
    url: 'http://crm-api.id-a.pl/',
    path: {
        default: 'api',
        files: 'storage/'
    }
}
```

Parameters:
* url - Your API domain, eg. http://127.0.0.1:8000/
* path.default - path to API on defined domain. The 'api' value means that appplication will be request to address: http://127.0.0.1:8000/api
* path.storage - path to file storage on defined domain

If you don't have prepared your own API yet, you can use default configuration first and connect to the API located at the address: http://crm-api.id-a.pl/

### Project configuration
First of all you must define the path to your API. To do this, you have to create config.js file in src folder.

#### src/config/params.js:

``` js
export const configParams = {
    title: "Vue CRUD",
    logoLg: 'vue-crud-lg.png',
    logoSm: 'vue-crud-sm.png',
    locales: [
      {name: 'en', text: 'English'},
      {name: 'pl', text: 'Polski'},
    ],
    defaultLocale: 'en',
    localeSelectable: true,
    iconfont: 'md',
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
    }
}
```

Parameters:
* title - Your project title. It will be visible on toolbar and browser's tab.
* logoLg - path to large logo. It will be displayed on login and home page.
* logoSm - path to small logo. It will be displayed on toolbar.
* locales - List of language versions available in your application.
* defaultLocale - Default locale.
* localeSelectable - If true, user will be able to choose the language version on the login page and after logging in.
* iconfont - parameter used by Vuetify. See <a href="https://vuetifyjs.com/en/framework/icons#usage" target="_blank">documentation</a>.
* theme - object of themes' colours used by Vuetify. See <a href="https://vuetifyjs.com/en/style/theme#customizing" target="_blank">documentation</a>.
* primaryTheme, secondaryTheme - Information on whether the theme is dark or light. Possible values are 'dark' or ''.

## Preparing the project

The last step before running the application is to add the `public` folder, language versions and application modules with the router to your project. All necessary files can be found in the folder `templates`. First, you can add these files without modifications to serve projects and then start with your customization.

### `public`
Copy `templates/public` folder with the content to your project main directory. In this folder you can customize eg. your index.html, favicon or robots.txt file.

### `locales`
Copy `templates/locales` content to the `src/locales`. Here you can define translations for locales used in your project. The contents of the folder should look like:

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
Then your `src/locales/index.js` file will look like this:
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

### `routes` and `router.js`
The last step is add some modules to your project. To do this, copy `routes` directory and `router.js` file from the templates folder to the `src/routes/main` location.

## Running the project
Now, when your project is ready, you can serve it in dev mode:
```
yarn serve
#or
npm run serve
```
or build it:
```
yarn build
#or
npm run build
```

