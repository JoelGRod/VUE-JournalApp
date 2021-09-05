<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <h1>Hello World</h1>
    <hr>

    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-success">Success</button>
    <button @click="goToDaybook()" 
            class="btn btn-success"
            test-id="daybook-home-button">Go To Daybook</button>

  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'Daybook-No-Entry' })
    }
  },
  components: { }
}
</script>
