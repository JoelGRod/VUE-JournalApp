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

    const logout = () => {
        store.commit('auth/logout')
    }

    return {
        // Public methods
        createUser,
        loginUser,
        checkAuthStatus,
        logout,
        getAuthStatus: computed(
            () => store.getters['auth/currentStatus']
        ),
        getUsername: computed(
            () => store.getters['auth/username']
        )
    }
}

export default useAuth