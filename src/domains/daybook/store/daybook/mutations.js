
export default {
    setEntries( state, entries ) {
        state.entries = [...state.entries, ...entries]
        state.isLoading = false
    },
    updateEntry( state, updatedEntry ) {
        const updatedEntries = state.entries.map( entry => {
            if(entry.id === updatedEntry.id) return updatedEntry
            return entry
        })
        console.log(updatedEntries)
        state.entries = [ ...updatedEntries ]
        state.isLoading = false
    },
    addEntry(/*state*/) {

    },
}