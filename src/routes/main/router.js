import Administration from './routes/administration/Index.vue'
import administrationRoutes from './routes/administration/router'
import Crm from './routes/crm/Index.vue'
import crmRoutes from './routes/crm/router'
import Wholesalers from './routes/wholesalers/Index.vue'
import wholesalersRoutes from './routes/wholesalers/router'
import Pharmacies from './routes/pharmacies/Index.vue'
import pharmaciesRoutes from './routes/pharmacies/router'
import Hospitals from './routes/hospitals/Index.vue'
import hospitalsRoutes from './routes/hospitals/router'

let mainRoutes = [
    {
        path: 'administration',
        name: 'administration',
        component: Administration,
        children: administrationRoutes
    },
    {
        path: 'crm',
        name: 'crm',
        component: Crm,
        children: crmRoutes
    },
    {
        path: 'wholesalers',
        name: 'wholesalers',
        component: Wholesalers,
        children: wholesalersRoutes
    },
    {
        path: 'pharmacies',
        name: 'pharmacies',
        component: Pharmacies,
        children: pharmaciesRoutes
    },
    {
        path: 'hospitals',
        name: 'hospitals',
        component: Hospitals,
        children: hospitalsRoutes
    },
];

export default mainRoutes;
