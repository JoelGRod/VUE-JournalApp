import axios from "axios"

const firebaseApi = axios.create({
    baseURL: process.env.VUE_APP_FIREBASE_URL_API
})

// console.log(process.env.NODE_ENV) // testing -> test, development -> development

export default firebaseApi