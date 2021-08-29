const daybookRoutes = [
    {
        path: '',
        redirect: { name: 'Daybook-No-Entry' }
    },
    {
        path: 'entry/:id',
        name: 'Daybook-Entry',
        component: () => import(/* webpackChunkName: "daybook-entry" */ '../pages/EntryPage')
    },
    {
        path: 'no-entry',
        name: 'Daybook-No-Entry',
        component: () => import(/* webpackChunkName: "daybook-no-entry" */ '../pages/NoEntrySelectedPage')
    }
]

export default daybookRoutes