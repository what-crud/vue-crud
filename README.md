<p align="center">
  <img width="300" height="auto" src="https://user-images.githubusercontent.com/18534115/49319435-29ccf000-f4fd-11e8-9fc6-8678864132bd.png">
</p>

# Vue CRUD
> CRUD application written using Vue2, Vuex and Vuetify. The app uses REST API and JWT Tokens.

## About
Vue CRUD is Vue - based REST-ful CRUD application.

## Documentation

In progress

## Demo version
Demo application is available <a href="https://vue-crud.github.io/demo/#/" target="_blank">here</a>\
Credentials with limited privileges (readonly):\
Login:  guest@vue.crud\
Pass:   ajSGenC0\
To get full user account, contact me on my <a href="http://id-a.pl" target="_blank">company site</a>.

## Functions

The application contains a mechanism for managing the database tables. After adding table support to crud, the following record operations are possible:

* Store,
* Update,
* Suspend/Restore,
* Delete,
* Multiple update,
* Multiple Suspend/Restore,
* Multiple Delete

The record creation / editing form supports the following types of fields:

* Input,
* Number,
* Decimal
* Textarea,
* Rich Text Box,
* Select (list from related table),
* Datepicker,
* Timepicker
* Checkbox

Datatable is available in 2 versions:
* Client side (small tables < 2000 records)
* Server side (> 2000 records)

Each version has its own filtering system:
* Show active/inactive records,
* Search phrase in whole table,
* Search phrase in selected column (exact, like and list mode)

Another functions and features:
* datatable mechanism allows selection of the number of records per page, page transition and sorting,
* management of a child table from the parent table module,
* language versions,
* simple configuration of themes,

## API

To connect with API you have to create config.js in 'src' folder. You should use config.js.example template to do this:
``` js
export const config = {
    api: {
        url: 'http://127.0.0.1:8000/', /* your API url */
        path: {
            default: 'api',
            files: 'storage/'
        }
    }
}
```

To share the api, you can use any programming language and framework. But if you want to test the solution quickly, or you do not know how to get started, you can download my API created in PHP and Laravel:
<a href="https://github.com/szczepanmasny/laravel-api" target="_blank">szczepanmasny/laravel-api</a>.

## Build Setup

You must have node.js installed to use npm. You can use yarn if you prefer.
``` bash
# install dependencies
npm install
## or
yarn install

# serve with hot reload at localhost:8080
npm run dev
## or
yarn run dev

# build for production with minification
npm run build
## or
yarn run build
```

## Table management

Servicing the table requires creating a component with the configuration of the given table (field names and types, information about soft or hard deletion of records, reference to the source table in the case of foreign keys, etc.). Next step is to add routing to a given page:
* src\routes\main\router.js:
``` js
import Home from './routes/home/Index.vue'
import Crm from './routes/crm/Index.vue'
import crmRoutes from './routes/crm/router'
import Administration from './routes/administration/Index.vue'
import administrationRoutes from './routes/administration/router'
/* import here */

let mainRoutes = [
    {
        path: 'home',
        name: 'home',
        component: Home
    },
    {
        path: 'crm',
        name: 'crm',
        component: Crm,
        children: crmRoutes,
        meta: {guard: 'CRM'}
    },
    {
        path: 'administration',
        name: 'administration',
        component: Administration,
        children: administrationRoutes,
        meta: {guard: 'ADMIN'}
    },
    /* add your module here */
];

export default mainRoutes;
```
* src\routes\main\routes\[your-module-directory]\router.js:
``` js
import FirstTable from './routes/first-table/Index.vue'
import SecondTable from './routes/second-table/Index.vue'

let yourModuleRoutes = [
    {
        path: 'first-table',
        name: 'your-module.first-table',
        component: FirstTable,
    },
    {
        path: 'second-table',
        name: 'your-module.second-table',
        component: SecondTable,
    },
];

export default yourModuleRoutes;
```
Finally, add a link to the page in the menu:
* src\routes\main\components\Sidebar.vue:
``` js
import { mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      /* existing modules here */
      
      /* your module: */
      // START
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "yourModule.name",
        model: false,
        guard: "YOUR_MODULE_API_GUARD_NAME",
        route: "/your-module-path",
        children: [
          {
            text: "your-module.first-table",
            route: "/first-table"
          },
          {
            text: "your-module.second-table",
            route: "/second-table"
          },
        ]
      }
      // END
    ]
  }),
  computed: {
    ...mapGetters("auth", ["checkRole"])
  },
  props: {
    source: String
  }
};
```

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Szczepan Masny
