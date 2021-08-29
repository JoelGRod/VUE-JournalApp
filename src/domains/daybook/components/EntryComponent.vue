<template>
  <div class="entry-container mb-3 p-2 pointer">
    <!-- Tittle -->
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">15</span>
      <span class="mx-1 fs-5">July</span>
      <span class="mx-2 fw-light">2021, Thursday</span>
    </div>

    <!-- Entry Description -->
    <div class="entry-description">
      Excepteur aliqua aliquip officia exercitation et aliqua deserunt aliqua
      fugiat. Consectetur nisi cupidatat cupidatat elit qui consequat cillum
      quis esse. Deserunt qui sunt amet est magna incididunt ut. Elit elit
      ullamco eu magna magna aute voluptate cillum proident nostrud aliquip.
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }

    .entry-description {
        font-size: 0.9rem;
    }
}
</style>