import firebaseApi from "@/infrastructure/shared/api/firebaseApi";

export default {
    async loadEntries( context ) {
        try {
            const { data } = await firebaseApi.get('/entries.json')
            const entries = []
            if( !data ) return context.commit('setEntries', entries)

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
        const { id, date, text, picture } = entry
        const endpoint = `/entries/${id}.json`
        const body = { date, text, picture }

        await firebaseApi.put(endpoint, body)
        body.id = id
        context.commit('updateEntry', {...body})
    },
    async createEntry( context, entry ) {
        const { date, text, picture } = entry
        const endpoint = '/entries.json'
        const body = { date, text, picture }
        
        const { data } = await firebaseApi.post(endpoint, body)
        context.commit('addEntry', {
            id: data.name,
            ...entry
        })
        return data.name
    },
    async deleteEntry( context, entryId ) {
        const endpoint = `/entries/${entryId}.json`
        await firebaseApi.delete(endpoint)
        context.commit('deleteEntry', entryId)
    }
}