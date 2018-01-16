import pageOne from './routes/page-one/Index.vue'
import pageTwo from './routes/page-two/Index.vue'

let someModuleRoutes = [
    {
        path: 'page-one',
        name: 'someModule-pageOne',
        component: pageOne,
    },
    {
        path: 'page-two',
        name: 'someModule-pageTwo',
        component: pageTwo,
    },
];

export default someModuleRoutes;
