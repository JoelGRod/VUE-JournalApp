
// export default {
//     myGetter(state) {
//         return state
//     }
// }

export default {

    currentStatus( state ) {
        return state.status
    },
    username( state ) {
        return state.user?.name || ''
    }
    
}