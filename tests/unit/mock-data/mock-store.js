import { createStore } from "vuex";

import daybookStore from "@/domains/daybook/store/daybook";
import authStore from "@/domains/auth/store";

import { daybookState } from "./test-daybook-store";

const createVuexStore = (authInitState, daybookInitState = daybookState) =>
  createStore({
    modules: {
      auth: {
        ...authStore,
        state() {
          return { ...authInitState };
        },
      },
      daybook: {
        ...daybookStore,
        state() {
          return { ...daybookInitState };
        },
      },
    },
  });

export default createVuexStore;
