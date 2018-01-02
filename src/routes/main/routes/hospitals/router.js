import Users from './routes/users/Index.vue'
import Hospitals from './routes/hospitals/Index.vue'

let hospitalsRoutes = [
    {
        path: 'users',
        name: 'hospitals-users',
        component: Users,
    },
    {
        path: 'hospitals',
        name: 'hospitals-hospitals',
        component: Hospitals,
    },
];

export default hospitalsRoutes;
