import Companies from './routes/companies/Index.vue'
import People from './routes/people/Index.vue'
import Positions from './routes/positions/Index.vue'

let crmRoutes = [
    {
        path: 'companies',
        name: 'companies',
        component: Companies,
    },
    {
        path: 'people',
        name: 'people',
        component: People,
    },
    {
        path: 'positions',
        name: 'positions',
        component: Positions,
    },
];

export default crmRoutes;
