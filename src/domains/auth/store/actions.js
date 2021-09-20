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
    }

    
}