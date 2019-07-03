# Router

## What is a module router?

Module router is used to separate the links into logical groups. The features of the modules are as follows:
* links in the left sidebar will be grouped into modules,
* the path to the link will start with the name of the module ([domain name]/#/[module name]/[feature/table name]),
* you can specify a guard for each module (`meta.guard` in a route object). When logging in to LocalStorage, you can save the list of modules to which the user has access. If the name of the guard given at the route object is not on this list, the module won't be displayed in the sidebar, and the links won't be active. Of course, this isn't a real protection against attacks (this must be done on the backend side), but it allows you to adjust the user interface to its permissions.

#### src/routes/main/router.js:

```js
// required *
import Home from './routes/home/Index.vue'
// suggested **
import Administration from './routes/administration/Index.vue'
import administrationRoutes from './routes/administration/router'
// optional
import OwnModule1 from './routes/own-module-1/Index.vue'
import ownModule1Routes from './routes/own-module-1/router'
import OwnModule2 from './routes/own-module-2/Index.vue'
import ownModule2Routes from './routes/own-module-2/router'

let mainRoutes = [
    {
        // required *
        path: 'home',
        name: 'home',
        component: Home
    },
    {
        // suggested **
        path: 'administration',
        name: 'administration',
        component: Administration,
        children: administrationRoutes,
        meta: {guard: 'ADMIN'}
    },
    {
        // your own module 1 - optional
        path: 'own-module-1',
        name: 'OwnModule1',
        component: OwnModule1,
        children: ownModule1Routes, /* if module has child routes */
        meta: {guard: 'own-module-1-guard-name'} /* if it has guard */
    },
    {
        // your own module 2 - optional
        path: 'own-module-2',
        name: 'OwnModule2',
        component: OwnModule2,
        children: ownModule2Routes, /* if module has child routes */
        meta: {guard: 'own-module-2-guard-name'} /* if it has guard */
    },
];
export default mainRoutes;
```
(*) Home page is required bacause user will be redirected here after logging in. You can modify the module/site as you like.\
(**) This module will allow you to manage users and access. You can modify the module as you like.