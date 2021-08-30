<template>
  <button class="btn btn-primary fab-button">
      <i :class="getIcon"></i>
  </button>
</template>

<script>
export default {
  name: 'fab-icon',
  props: {
    icon: {
      type: String,
      default: 'fa-plus'
    }
  },
  computed: {
    getIcon() {
      return `fa fa-2x ${ this.icon }`
    }
  }

}
</script>

<style lang="scss" scoped>

.fab-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
}

</style>