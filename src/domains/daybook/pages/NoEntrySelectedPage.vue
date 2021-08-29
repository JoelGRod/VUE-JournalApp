<template>
  <div class="d-flex justify-content-center no-entry-container">
    <h1 class="align-self-center">No entry selected</h1>
  </div>

  <FabComponent></FabComponent>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'

export default {
    components: {
        FabComponent: defineAsyncComponent( () => import('../components/FabComponent') )
    }
}
</script>

<style lang="scss" scoped>
.no-entry-container {
  height: 100%;
}
</style>