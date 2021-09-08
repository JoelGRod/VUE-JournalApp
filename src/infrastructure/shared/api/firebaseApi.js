import axios from "axios"

const firebaseApi = axios.create({
    baseURL: process.env.FIREBASE_URL_API
})

console.log(process.env.NODE_ENV)

export default firebaseApi