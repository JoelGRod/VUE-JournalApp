import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Domains Routers
import daybookRoutes from "../domains/daybook/router";

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
    children: daybookRoutes
    // ...daybookRouter
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Daybook' }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
