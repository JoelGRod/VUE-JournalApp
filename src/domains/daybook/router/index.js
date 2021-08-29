const daybookRoutes = [
    {
        path: '',
        redirect: { name: 'Daybook-No-Entry' }
    },
    {
        path: 'home',
        name: 'Daybook-Home',
        component: () => import(/* webpackChunkName: "daybook-home" */ '../pages/HomePage') 
    },
    {
        path: 'no-entry',
        name: 'Daybook-No-Entry',
        component: () => import(/* webpackChunkName: "daybook-no-entry" */ '../pages/NoEntrySelectedPage')
    }
]

export default daybookRoutes