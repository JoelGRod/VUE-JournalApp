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
    async updateEntry(/*context*/) {
        // TODO
    },
    async createEntry(/*context*/) {
        // TODO
    }
}