
export default {
    setEntries( state, entries ) {
        state.entries = [...state.entries, ...entries]
        state.isLoading = false
    },
    updateEntry( state, updatedEntry ) {
        const index = state.entries.map( entry => entry.id ).indexOf(updatedEntry.id)
        state.entries[index] = updatedEntry
    },
    addEntry(/*state*/) {

    },
}