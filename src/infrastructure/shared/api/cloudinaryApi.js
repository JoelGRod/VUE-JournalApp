import axios from "axios"

const cloudinaryUploadApi = axios.create({
    baseURL: process.env.CLOUDINARY_URL_API
})

export default cloudinaryUploadApi