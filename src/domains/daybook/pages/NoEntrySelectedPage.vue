<template>
  <div class="d-flex justify-content-center no-entry-container">
    <h1 class="align-self-center">No entry selected</h1>
  </div>

  <FabComponent @on:click="newEntry()"></FabComponent>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

export default {
  name: "no-entry-selected-page",
  methods: {
    async newEntry() {
      console.log("new entry");
    },
  },
  components: {
    FabComponent: defineAsyncComponent(() =>
      import("../components/FabComponent")
    ),
  },
};
</script>

<style lang="scss" scoped>
.no-entry-container {
  height: 100%;
}
</style>