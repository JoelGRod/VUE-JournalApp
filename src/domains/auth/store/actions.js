import authApi from "../../../infrastructure/shared/api/authApi";

export default {

    async createUser(context, user) {

        const { name, email, password } = user

        try {
            // Create new user
            const { data } = await authApi.post(
                ':signUp',
                { email, password, returnSecureToken: true }
            )
            const { idToken, refreshToken } = data
            // Add info to new user
            await authApi.post(
                ':update',
                { idToken, displayName: name }
            )
            // Commit Mutation
            delete user.password
            context.commit(
                'loginUser',
                { user, idToken, refreshToken }
            )

            return {
                ok: true
            }
        } catch (error) {
            return {
                ok: false,
                msg: error.response.data.error.message
            }
        }
    },

    async loginUser(context, user) {

        const { email, password } = user

        try {
            // Login user
            const { data } = await authApi.post(
                ':signInWithPassword',
                { email, password, returnSecureToken: true }
            )
            const { displayName, idToken, refreshToken } = data
            // Commit Mutation
            delete user.password
            user.name = displayName
            context.commit(
                'loginUser',
                { user, idToken, refreshToken }
            )

            return {
                ok: true
            }
        } catch (error) {
            return {
                ok: false,
                msg: error.response.data.error.message
            }
        }
    },

    async checkAuth( context ) {

        const idToken = localStorage.getItem('idToken')
        const refreshToken = localStorage.getItem('refreshToken')

        if( !idToken ) {
            context.commit('logout')
            return { ok: false, msg: 'token not found' }
        }

        try {
            // Check Auth
            const { data } = await authApi.post(
                ':lookup',
                { idToken }
            )
            const { displayName, email } = data.users[0]
            // Commit Mutation
            const user = {
                name: displayName,
                email
            }
            context.commit(
                'loginUser', 
                { user, idToken, refreshToken }
            )

            return { ok: true }

        } catch (error) {
            context.commit('logout')
            return {
                ok: false,
                msg: error.response.data.error.message
            }
        }
    }
}