import axios from "axios"

const firebaseApi = axios.create({
    baseURL: 'https://vue-testing-projects-default-rtdb.europe-west1.firebasedatabase.app'
})

export default firebaseApi