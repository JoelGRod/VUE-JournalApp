import { createStore } from 'vuex'
// Modules
import daybookStore from "@/domains/daybook/store/daybook";

// Create a new store instance.
const store = createStore({
  modules: {
      daybook: daybookStore
  }
})

export default store