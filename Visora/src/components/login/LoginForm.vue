<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/service/auth'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await login({
      email: email.value,
      password: password.value
    })
    console.log('RESPONSE:', response)
    const token = response?.data?.token

    if (rememberMe.value) {
      localStorage.setItem('token', token)
    } else {
      sessionStorage.setItem('token', token)
    }

    router.push('/')

  } catch (error) {
    console.log(error)
    alert('Login gagal!')
  }
}
</script>

<template>
  <div class="login-form-container text-light">
    <div class="header-form">
      <h2 class="mb-3 fs-1">Login</h2>
      <p>Selamat datang kembali! Tolong masuk untuk akun anda.</p>
    </div>

    <div class="login-form">
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

    <div class="login-button">
      <button class="fs-5" @click="handleLogin">Login</button>
    </div>

    <div class="signin-link">
      <span class="me-2">New here?</span>
      <RouterLink to="/signinpage" class="text-decoration-none">
          <button class="btn btn-link text-warning p-0 border-0 bg-transparent text-decoration-none">Signup</button>
      </RouterLink>
    </div>
  </div>
</template>
