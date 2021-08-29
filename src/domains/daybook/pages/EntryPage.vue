<template>
  <div class="entry-title d-flex justify-content-between p-2">
      <div>
          <span class="text-success fs-3 fw-bold">15</span>
          <span class="mx-1 fs-3">July</span>
          <span class="mx-2 fs-4 fw-light">2021, Thursday</span>
      </div>

      <div>
          <button class="btn btn-danger mx-2">Delete
              <i class="fa fa-trash-alt"></i>
          </button>
          <button class="btn btn-primary">Delete
              <i class="fa fa-upload"></i>
          </button>
      </div>
  </div>

  <hr>
  <FabComponent></FabComponent>

  <dic class="d-flex flex-column px-3 h-75">
      <textarea placeholder="What\'s happen?"></textarea>
  </dic>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'

export default {
    components: {
        FabComponent: defineAsyncComponent(() => import('../components/FabComponent'))
    }
}
</script>

<style>

</style>