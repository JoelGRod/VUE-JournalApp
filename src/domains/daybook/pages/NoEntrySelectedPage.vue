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
    newEntry() {
      return this.$router.push( { name: 'Daybook-Entry', params: { id: 'new' } })  
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