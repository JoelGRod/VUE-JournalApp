import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Domains Routers
import daybookRoutes from "../domains/daybook/router";
import authRoutes from "../domains/auth/router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/daybook',
    name: 'Daybook',
    component: () => import(/* webpackChunkName: "daybook" */ '@/domains/daybook/layouts/DayBookLayout.vue'),
    children: daybookRoutes // -> Option A Separate only children
    // ...daybookRouter // -> Option B Separate name, component and children in object
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/domains/auth/layouts/AuthLayout.vue'),
    children: authRoutes // -> Option A Separate only children
    // ...daybookRouter // -> Option B Separate name, component and children in object
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
