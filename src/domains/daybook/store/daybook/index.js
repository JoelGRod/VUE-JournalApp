import actions from "./actions";
import mutations from "./mutations";
import state from "./state";
import getters from "./getters";

const daybookStore = {
    
    namespaced: true,

    state() {
        return state;
    },
    getters: getters,
    actions: actions,
    mutations: mutations
}

export default daybookStore