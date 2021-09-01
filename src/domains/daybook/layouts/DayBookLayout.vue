<template>
  <NavbarComponent></NavbarComponent>
  
  <div v-if="isLoading" class="row justify-content-center">
    <div class="col-3 alert-info text-center mt-5">
      Wait a moment please...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else class="d-flex">
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
import { mapActions, mapState } from "vuex";

export default {
  name: "daybook-layout",
  methods: {
    ...mapActions("daybook", ["loadEntries"]),
  },
  computed: {
    ...mapState("daybook", ["isLoading"])
  },
  components: {
    NavbarComponent: defineAsyncComponent(() =>
      import("../components/NavbarComponent")
    ),
    EntryListComponent: defineAsyncComponent(() =>
      import("../components/EntryListComponent")
    ),
  },
  created() {
    this.loadEntries();
  },
};
</script>


