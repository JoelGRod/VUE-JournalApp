<template>
  <NavbarComponent></NavbarComponent>
  <div class="d-flex">
    <div class="col-4">
        <EntryListComponent></EntryListComponent>
    </div>
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    NavbarComponent: defineAsyncComponent(() => import("../components/NavbarComponent")),
    EntryListComponent: defineAsyncComponent(() => import('../components/EntryListComponent'))
  },
};
</script>


