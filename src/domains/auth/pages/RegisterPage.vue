<template>
  <span class="login100-form-title p-b-41"> Register </span>
  <form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">

    <div class="wrap-input100 validate-input" data-validate="Enter username">
      <input v-model="registerForm.name" class="input100" type="text" placeholder="Username" required />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter email">
      <input v-model="registerForm.email" class="input100" type="email" placeholder="Email" required />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        v-model="registerForm.password"
        class="input100"
        type="password"
        placeholder="Password"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button class="login100-form-btn" type="submit">Register</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from "vue"
import useAuth from "../composables/useAuth";

export default {

  setup() {

    const { createUser } = useAuth()

    const registerForm = ref({
      name: 'test',
      email: 'test@test.com',
      password: '123456'
    })

    return {
      // Public Properties
      registerForm,
      // Public methods
      onSubmit: async () => {
        const resp = await createUser( registerForm.value )
        console.log(resp)
      }
    }

  }
};
</script>