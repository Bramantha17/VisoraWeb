<script setup>
import { ref } from 'vue'
const first_name =ref('')
const last_name =ref('')
const email = ref('')
const password = ref('')
const emit = defineEmits(['submit'])

const submitForm = () => {
  emit('submit', {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    password: password.value
  })
}
</script>

<template>
  <div class="signin-form-container text-light">
    <div class="header-form">
      <h2 class="mb-3 fs-1">Signin</h2>
      <p>Bergabung dengan kami sekarang!</p>
    </div>

    <div class="signin-form">
      <div class="row name_input">
        <div class="first-name col-md-6 form-floating mb-4">
          <input
          v-model="first_name"
          type="text" class="form-control shadow-lg"
          id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">First name</label>
        </div>
        <div class="last-name col-md-6 form-floating mb-4">
           <input
           v-model="last_name"
           type="text" class="form-control shadow-lg"
           id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Last name</label>
        </div>
      </div>

      <span class="d-block mb-2">Email</span>
      <div class="form-floating mb-4">
        <input
        v-model="email"
        type="email" class="form-control shadow-lg"
        id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Visora27@gmail.com</label>
      </div>
      <span class="d-block mb-2">Password</span>
      <div class="form-floating mb-5">
        <input
        v-model="password"
        type="password"
        class="form-control shadow-lg"
        id="floatingInput"
        placeholder="Password kamu!">
        <label for="floatingInput">Visora123</label>
      </div>
    </div>
    <div class="options d-flex justify-content-between align-items-center mb-4">
      <div class="form-check">
        <input
        type="checkbox"
        class="form-check-input"
        v-model="rememberMe"
        id="rememberCheck"
        >
        <label
        class="form-check-label"
        for="rememberCheck">
          Ingatkan Saya
        </label>
      </div>
      <button class="btn text-decoration-none p-0">Lupa Sandi?</button>
    </div>

    <div class="signin-button">
       <button class="mt-3" @click="submitForm">Register</button>
    </div>

    <div class="signin-link">
      <span class="me-2">New here?</span>
      <RouterLink to="/signinpage" class="text-decoration-none">
          <button class="btn btn-link text-warning p-0 border-0 bg-transparent text-decoration-none">Signup</button>
      </RouterLink>
    </div>
  </div>
</template>
