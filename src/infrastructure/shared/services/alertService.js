import Swal from 'sweetalert2'

export const showLoader = () => {
    Swal.fire({
        title: 'Please Wait...',
        allowOutsideClick: false
    })
    Swal.showLoading()
}

export const showSuccess = (title, text) => {
    Swal.fire(title, text, 'success')
}

export const showError = (title, text) => {
    Swal.fire(title, text, 'error')
}

export const showDecision = async ( title, text ) => {
    const { isConfirmed } = await Swal.fire({
        title,
        text,
        showDenyButton: true,
        confirmButtonText: 'Yes, i\'m sure'
    })
    return isConfirmed
}