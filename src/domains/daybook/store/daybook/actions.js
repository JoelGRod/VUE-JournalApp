import firebaseApi from "@/infrastructure/shared/api/firebaseApi";

export default {
    async loadEntries( context ) {
        try {
            const { data } = await firebaseApi.get('/entries.json')
            const entries = []
            for(let id of Object.keys(data)) {
                entries.push({
                   id,
                   ...data[id] 
                })
            }
            context.commit('setEntries', entries)
        } catch (error) {
            console.log(error)
        }
    },
    async updateEntry( context, entry ) {
        const { id, date, text, picture} = entry
        const endpoint = `/entries/${id}.json`
        const body = { date, text, picture }

        const { data } = await firebaseApi.put(endpoint, body)
        const updatedEntry = {
            id,
            ...data
        }
        context.commit('updateEntry', {...updatedEntry})
    },
    async createEntry(/*context*/) {
        // TODO
    }
}