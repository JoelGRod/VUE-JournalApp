<template>
  <h1 v-if="getAuthStatus === 'authenticating'">
    {{ getAuthStatus }}
  </h1>
  <router-view v-else/>
</template>

<script>
import useAuth from "./domains/auth/composables/useAuth"

export default {

  setup() {

    const { getAuthStatus, checkAuthStatus } = useAuth()

    checkAuthStatus()
    
    return {
      // Public methods
      getAuthStatus
    }
  },
}
</script>

