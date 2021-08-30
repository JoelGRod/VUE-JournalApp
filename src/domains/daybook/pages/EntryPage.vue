<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">15</span>
      <span class="mx-1 fs-3">July</span>
      <span class="mx-2 fs-4 fw-light">2021, Thursday</span>
    </div>

    <div>
      <button class="btn btn-danger mx-2">
        Delete
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="btn btn-primary">
        Upload Image
        <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>

  <hr />
  <FabComponent icon="fa-save"></FabComponent>

  <div class="d-flex flex-column px-3 h-75">
    <textarea class="entry-textarea" placeholder="What's happen?"></textarea>
  </div>

  <img
    src="https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?cs=srgb&dl=pexels-riccardo-bertolo-4245826.jpg&fm=jpg"
    alt="entry-photo"
    class="img-thumbnail entry-img"
  />
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

export default {
  components: {
    FabComponent: defineAsyncComponent(() =>
      import("../components/FabComponent")
    ),
  },
};
</script>

<style lang="scss" scoped>
.entry-textarea {
  font-size: 1.2rem;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

.entry-img {
    position: fixed;
    bottom: 9rem;
    right: 1rem;
    width: 12rem;
    box-shadow: 0px 5px 10px rgba($color: #333333, $alpha: 0.2);
}
</style>