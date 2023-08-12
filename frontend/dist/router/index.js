import { createRouter, createWebHistory } from "vue-router";
// import { auth } from '../firebase'
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import UserProfile from '../components/UserProfile.vue';
import Layout from '../components/Layout.vue';
import Summary from '../components/Summary.vue';
import ChartBuilder from '../components/ChartBuilder.vue';
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/profile',
        name: 'profile',
        component: UserProfile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/layout',
        name: 'layout',
        component: Layout,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/summary',
        name: 'summary',
        component: Summary,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/chart-builder',
        name: 'chart-builder',
        component: ChartBuilder,
        meta: {
            requiresAuth: true
        }
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
// router.beforeEach((to, from, next) => {
//    const currentUser = auth.currentUser;
//    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//    if (requiresAuth && !currentUser) next('login');
//    else if (!requiresAuth && currentUser) next ('home');
//    else next();
// });
export default router;
//# sourceMappingURL=index.js.map