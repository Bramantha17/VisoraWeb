<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { resetPassword } from '@/service/auth'
import AuthBackground from '@/components/auth/AuthBackground.vue'

const route = useRoute()
const router = useRouter()

const password = ref('')
const passwordConfirmation = ref('')
const loading = ref(false)
const message = ref('')

const token = route.query.token
const email = route.query.email

const handleResetPassword = async () => {
  try {
    loading.value = true
    message.value = ''

    await resetPassword({
      token,
      email,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })

    message.value = 'Password berhasil direset'

    setTimeout(() => {
      router.push('/loginpage')
    }, 1500)
  } catch (err) {
    console.log(err)
    message.value = 'Gagal reset password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page d-flex vh-100 w-100 overflow-hidden">
    <!-- LEFT SIDE -->
    <div class="w-50">
      <AuthBackground />
    </div>

    <!-- RIGHT SIDE -->
    <div class="w-50 d-flex justify-content-center align-items-center">
      <div class="login-form-container text-light w-75">
        <div class="header-form">
          <h2 class="mb-3 fs-1 text-black">Reset Password</h2>
          <p>Masukkan password baru Anda.</p>
        </div>

        <div class="login-form">
          <span class="d-block mb-2">Password Baru</span>
          <div class="form-floating mb-3">
            <input
              v-model="password"
              type="password"
              class="form-control shadow-lg"
              placeholder="Password baru"
            />
            <label>Password Baru</label>
          </div>

          <span class="d-block mb-2">Konfirmasi Password</span>
          <div class="form-floating mb-4">
            <input
              v-model="passwordConfirmation"
              type="password"
              class="form-control shadow-lg"
              placeholder="Konfirmasi password"
            />
            <label>Konfirmasi Password</label>
          </div>

          <p v-if="message" class="text-warning mb-3">
            {{ message }}
          </p>
        </div>

        <div class="login-button">
          <button class="fs-5" @click="handleResetPassword" :disabled="loading">
            {{ loading ? 'Memproses...' : 'Reset Password' }}
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
