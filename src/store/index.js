import { createStore } from 'vuex'
// Modules
import daybookStore from "@/domains/daybook/store/daybook"
import authStore from '../domains/auth/store'

// Create a new store instance.
const store = createStore({
  modules: {
      auth: authStore,
      daybook: daybookStore
  }
})

export default store