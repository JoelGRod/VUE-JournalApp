import axios from "axios"

const cloudinaryUploadApi = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/do7c3iy3j/image/upload'
})

export default cloudinaryUploadApi