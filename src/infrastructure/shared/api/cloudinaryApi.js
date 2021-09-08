import axios from "axios"

const cloudinaryUploadApi = axios.create({
    baseURL: process.env.VUE_APP_CLOUDINARY_URL_API
})

export default cloudinaryUploadApi