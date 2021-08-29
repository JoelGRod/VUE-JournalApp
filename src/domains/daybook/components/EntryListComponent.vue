<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Search Entry" />
    </div>

    <div class="entry-scrollarea px-2 pt-2">
      <EntryComponent v-for="item in 100" :key="item"></EntryComponent>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
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