
export default {
    setEntries( state, entries ) {
        state.entries = [...state.entries, ...entries]
        state.isLoading = false
        state.lastMutation = 'setEntries'
    },
    updateEntry( state, updatedEntry ) {
        const index = state.entries.map( entry => entry.id ).indexOf(updatedEntry.id)
        state.entries[index] = updatedEntry
        state.lastMutation = 'updateEntry'
    },
    addEntry( state, entry ) {
        state.entries.push( entry )
        state.lastMutation = 'addEntry'
    },
}