import cloudinaryUploadApi from "../api/cloudinaryApi";

const uploadImage = async( file ) => {
    if( !file ) return

    try {
        // Prepare body
        const formData = new FormData()
        formData.append('upload_preset', 'vue-tests')
        formData.append('file', file)
        // Send request
        const { data } = await cloudinaryUploadApi.post('', formData)
        // Return specific data
        return data.secure_url
    } catch (error) {
        console.log('Unable to upload image, call administrator')
        console.log(error)
        return null
    }
}

export default uploadImage