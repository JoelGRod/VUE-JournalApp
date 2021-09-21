import axios from "axios"

const firebaseApi = axios.create({
    baseURL: process.env.VUE_APP_FIREBASE_URL_API
})

firebaseApi.interceptors.request.use( ( config ) => {
    config.params = {
        auth: localStorage.getItem('idToken')
    }
    // config.headers = {
    //     authorization: 'bearer idToken'
    // }
    return config
})

// console.log(process.env.NODE_ENV) // testing -> test, development -> development

export default firebaseApi