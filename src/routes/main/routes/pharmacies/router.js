import Users from './routes/users/Index.vue'
import Pharmacies from './routes/pharmacies/Index.vue'

let pharmaciesRoutes = [
    {
        path: 'users',
        name: 'pharmacies-users',
        component: Users,
    },
    {
        path: 'pharmacies',
        name: 'pharmacies-pharmacies',
        component: Pharmacies,
    },
];

export default pharmaciesRoutes;
