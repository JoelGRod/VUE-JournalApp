
export default {
    setEntries( state, entries ) {
        state.entries = [...state.entries, ...entries]
        state.isLoading = false
        state.lastMutation = 'setEntries'
    },
    updateEntry( state, updatedEntry ) {
        const index = state.entries.map( entry => entry.id ).indexOf(updatedEntry.id)
        state.entries[index] = updatedEntry // Reference problem in test
        state.lastMutation = 'updateEntry'
    },
    addEntry( state, entry ) {
        // state.entries.unshift( entry ) // BAD, reference problems in tests
        state.entries = [ entry, ...state.entries ]
        state.lastMutation = 'addEntry'
    },
    deleteEntry( state, entryId ) {
        state.entries = state.entries.filter( 
            entry => entry.id !== entryId
        )
        state.lastMutation = 'deleteEntry'
    },
    clearEntries( state ) {
        state.entries = []
        state.lastMutation = 'clearEntries'
    }
}