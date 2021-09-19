import { useStore } from "vuex"

const useAuth = () => {

    const store = useStore()

    const createUser = async ( user ) => {
        console.log(user)
        console.log(store)
        // TODO: store.dispatch('auth/createUser', user)
        // return resp
    }

    return {
        // Public methods
        createUser
    }
}

export default useAuth