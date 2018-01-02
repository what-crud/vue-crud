import Users from './routes/users/Index.vue'
import Wholesalers from './routes/wholesalers/Index.vue'

let wholesalersRoutes = [
    {
        path: 'users',
        name: 'wholesalers-users',
        component: Users,
    },
    {
        path: 'wholesalers',
        name: 'wholesalers-wholesalers',
        component: Wholesalers,
    },
];

export default wholesalersRoutes;
