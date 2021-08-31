

export default {
    getEntriesByTerm( state ) {
        return ( term ) => {
            if( term.length === 0 ) return state.entries
            
            return state.entries.filter( element => element.text.toLowerCase().includes( term.toLowerCase() ))
        }
    },
    getEntryById(/*state*/) {
        //TODO
    }
}