

export default {
    getEntriesByTerm( state ) {
        return ( term ) => {
            if( term.length === 0 ) return state.entries
            
            return state.entries.filter( element => element.text.toLowerCase().includes( term.toLowerCase() ))
        }
    },
    getEntryById( state ) {
        return ( entryId ) => {
            const entry = state.entries.find( element => element.id.toString() === entryId )
            if(!entry) return undefined
            return { ...entry }
        }
    }
}