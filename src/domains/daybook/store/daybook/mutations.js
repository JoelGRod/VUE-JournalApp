
export default {
    setEntries( state, entries ) {
        state.entries = [...state.entries, ...entries]
        state.isLoading = false
    },
    updateEntry(/*state*/) {

    },
    addEntry(/*state*/) {

    },
}