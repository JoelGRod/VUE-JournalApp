import authApi from "../../../infrastructure/shared/api/authApi";


export default {
    async createUser(context, user) {
        
        const { email, password } = user

        try {
            const { data } = await authApi.post(':singUp', { email, password, returnSecureToken: true })
            console.log(data)
            // Commit
            return {
                ok: true
            }
        } catch (error) {
            console.log(error)
            return {
                ok: false,
                msg: '...'
            }
        }
    }
}