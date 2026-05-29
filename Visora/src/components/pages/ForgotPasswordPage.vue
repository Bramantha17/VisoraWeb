<script setup>
import { ref } from 'vue'
import { forgotPassword } from '@/service/auth'
import AuthBackground from '@/components/auth/AuthBackground.vue'

const email = ref('')
const loading = ref(false)
const message = ref('')

const handleForgotPassword = async () => {
  try {
    loading.value = true
    message.value = ''

    const res = await forgotPassword({
      email: email.value,
    })

    message.value = 'Link reset password telah dikirim ke email Anda'
    console.log(res)
  } catch (err) {
    console.log(err)
    message.value = 'Gagal mengirim email reset password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page d-flex vh-100 w-100 overflow-hidden">
    <div class="w-50">
      <AuthBackground />
    </div>

    <!-- RIGHT SIDE -->
    <div class="w-50 d-flex justify-content-center align-items-center">
      <div class="login-form-container text-light w-75">
        <div class="header-form">
          <h2 class="mb-3 fs-1 text-black">Lupa Password</h2>
          <p>Masukkan email Anda untuk menerima link reset password.</p>
        </div>

        <div class="login-form">
          <span class="d-block mb-2">Email</span>

          <div class="form-floating mb-4">
            <input
              v-model="email"
              type="email"
              class="form-control shadow-lg"
              placeholder="name@example.com"
            />
            <label>Email Anda</label>
          </div>

          <p v-if="message" class="text-warning mb-3">
            {{ message }}
          </p>
        </div>

        <div class="login-button">
          <button class="fs-5" @click="handleForgotPassword" :disabled="loading">
            {{ loading ? 'Mengirim...' : 'Kirim Link Reset' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.d-flex {
  min-height: 100vh;
}

.auth-page {
  margin-top: -100px;
  height: 100vh;
}

.login-button {
  display: flex;
  justify-content: left;
}

.login-button button {
  width: 220px;
  max-width: 100%;
}
</style>
