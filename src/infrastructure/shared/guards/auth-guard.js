import store from "@/store"

const isAuthenticatedGuard = async ( to, from, next ) => {

    const { ok } = await store.dispatch('auth/checkAuth')

    if( ok ) next()
    else next( { name: 'Login' } )

}

export default isAuthenticatedGuard