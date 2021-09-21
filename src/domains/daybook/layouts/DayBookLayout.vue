<template>
  <NavbarComponent 
    :userName="username" 
    @on:logout="onLogout">
  </NavbarComponent>
  
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
import { 
  mapActions, mapState, mapMutations, mapGetters 
} from "vuex";

export default {
  name: "daybook-layout",
  methods: {
    ...mapActions("daybook", ["loadEntries"]),
    ...mapMutations("daybook", ["clearEntries"]),
    ...mapMutations("auth", ["logout"]),
    onLogout() {
      this.$router.push( { name: 'Login' } )
      this.logout()
    }
  },
  computed: {
    ...mapState("daybook", ["isLoading"]),
    ...mapGetters("auth", ["username"]),
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
  unmounted() {
    this.clearEntries()
  }
};
</script>


