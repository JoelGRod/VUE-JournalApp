import actions from "./actions";
import mutations from "./mutations";
import state from "./state";
import getters from "./getters";

const authStore = {
    
    namespaced: true,

    state() {
        return state;
    },
    getters: getters,
    actions: actions,
    mutations: mutations
}

export default authStore