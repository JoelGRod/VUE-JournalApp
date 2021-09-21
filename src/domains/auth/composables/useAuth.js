import { useStore } from "vuex"
import { computed } from "vue"

const useAuth = () => {

    const store = useStore()

    const createUser = async ( user ) => {
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    const loginUser = async ( user ) => {
        const resp = await store.dispatch('auth/loginUser', user)
        return resp
    }

    const checkAuthStatus = async () => {
        const resp = await store.dispatch('auth/checkAuth')
        return resp
    }

    return {
        // Public methods
        createUser,
        loginUser,
        checkAuthStatus,
        getAuthStatus: computed(
            () => store.getters['auth/currentStatus']
        )
    }
}

export default useAuth