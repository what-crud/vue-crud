# Router

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