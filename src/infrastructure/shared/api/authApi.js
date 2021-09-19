import axios from "axios"

const authApi = axios.create({
    baseURL: process.env.VUE_APP_FIREBASE_AUTH_API,
    params: {
        key: process.env.VUE_APP_FIREBASE_API_KEY
    }
})

// console.log(process.env.NODE_ENV) // testing -> test, development -> development

export default authApi