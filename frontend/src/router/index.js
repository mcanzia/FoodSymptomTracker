import Vue from 'vue'
import VueRouter from 'vue-router'
//import { auth } from '../firebase'
import Home from '@/components/Home'
import Login from '@/components/Login'
import UserProfile from '@/components/UserProfile'
import Layout from '@/components/Layout'
import Summary from '@/components/Summary'
import ChartBuilder from '@/components/ChartBuilder'

Vue.use(VueRouter)

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
]

const router = new VueRouter({
   mode: 'history',
   routes
})

/*
router.beforeEach((to, from, next) => {
   const currentUser = auth.currentUser;
   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

   if (requiresAuth && !currentUser) next('login');
   else if (!requiresAuth && currentUser) next ('home');
   else next();
});*/

export default router