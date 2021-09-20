<template>
  <span class="login100-form-title p-b-41"> Ingresar </span>
  <form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">

    <div class="wrap-input100 validate-input" data-validate="Enter email">
      <input 
        v-model="loginForm.email" 
        class="input100" 
        type="text" 
        placeholder="Email"
        autocomplete="username" 
        required />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        v-model="loginForm.password"
        class="input100"
        type="password"
        placeholder="Password"
        autocomplete="current-password"
        required />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button 
        type="submit" 
        class="login100-form-btn">Login</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'Register' }">You do not have an account?</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import useAuth from "../composables/useAuth"

import { showError } from "@/infrastructure/shared/services/alertService"

export default {

  setup() {

    const router = useRouter()
    const { loginUser } = useAuth()

    const loginForm = ref({
      email: 'test@test.com',
      password: '123456'
    })

    return {
      // Public Properties
      loginForm,
      // Public methods
      onSubmit: async () => {
        const { ok, msg } = await loginUser( loginForm.value )
        if( ok ) return router.push( { name: 'Daybook-No-Entry' } )
        
        showError( 'Something has not gone well', msg )
      }
    }
  }
};
</script>