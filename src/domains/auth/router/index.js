
const authRoutes = [
    {
        path: '',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../pages/LoginPage.vue')
    },
    {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../pages/RegisterPage.vue')
    },
]

export default authRoutes