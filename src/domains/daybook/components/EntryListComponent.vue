<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Search Entry"
        v-model="term"
      />
    </div>

    <div class="mt-2 d-flex flex-column">
      <button
        @click="$router.push({ name: 'Daybook-Entry', params: { id: 'new' } })"
        class="btn btn-primary mx-3">
        <i class="fa fa-plus-circle"></i>
        New Entry
      </button>
    </div>

    <div class="entry-scrollarea px-2 pt-2">
      <EntryComponent
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry"
      >
      </EntryComponent>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      term: "",
    };
  },
  computed: {
    ...mapGetters("daybook", {
      getEntriesByTerm: "getEntriesByTerm",
    }),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
  components: {
    EntryComponent: defineAsyncComponent(() => import("./EntryComponent")),
  },
};
</script>

<style land="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 3rem);
}

.entry-scrollarea {
  height: calc(100vh - 6rem);
  overflow: scroll;
}
</style>