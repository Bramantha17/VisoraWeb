<script setup>
import { register } from '@/service/auth'
import { useRouter } from 'vue-router'
import SigninForm from '../signup/SigninForm.vue'
import SigninWave from '../signup/SigninWave.vue'

const router = useRouter()

const handleRegister = async (formData) => {
  try {
    const res = await register  (formData)

    localStorage.setItem('token', res.token)

    alert('Register berhasil 🎉')

    router.push('/')
  } catch (err) {
    console.error(err)
    alert('Register gagal')
  }
}
</script> 

<template>
  <div class="d-flex signin-background">
    <div>
      <SigninForm @submit="handleRegister"></SigninForm>
    </div>
    <div>
      <SigninWave></SigninWave>
    </div>
  </div>
</template>