<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Search Entry" v-model="term" />
    </div>

    <div class="entry-scrollarea px-2 pt-2">
      <EntryComponent v-for="item in getEntriesByTerm" :key="item.id"></EntryComponent>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      term: ''
    }
  },
  computed: {
    ...mapGetters('daybook', { 
      getEntriesByTerm: "getEntriesByTerm"
    })
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