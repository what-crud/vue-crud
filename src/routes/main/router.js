import Administration from './routes/administration/Index.vue'
import administrationRoutes from './routes/administration/router'
import Crm from './routes/crm/Index.vue'
import crmRoutes from './routes/crm/router'
import someModule from './routes/some-module/Index.vue'
import someModuleRoutes from './routes/some-module/router'

let mainRoutes = [
    {
        path: 'administration',
        name: 'administration',
        component: Administration,
        children: administrationRoutes,
        meta: {guard: 'ADMIN'}
    },
    {
        path: 'crm',
        name: 'crm',
        component: Crm,
        children: crmRoutes,
        meta: {guard: 'CRM'}
    },
    {
        path: 'some-module',
        name: 'someModule',
        component: someModule,
        children: someModuleRoutes,
        meta: {guard: 'someModule'}
    },
];

export default mainRoutes;
