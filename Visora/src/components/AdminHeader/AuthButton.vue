<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLogin = computed(() => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  return !!token
})

const handleLogout = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  router.push('/')
  window.location.reload()
}
</script>

<template>  
<div>
  <div v-if="!isLogin" class="d-flex ms-3">
    <RouterLink to="/loginpage">
      <button
        class="btn btn-warning rounded-3"
        style="width: 130px; height: 45px;"
      >
        Login
      </button>
    </RouterLink>

    <RouterLink to="/signinpage" class="ms-4">
      <button
        class="btn btn-outline-warning rounded-3"
        style="width: 130px; height: 45px;"
      >
        Sign Up
      </button>
    </RouterLink>
  </div>

  <div v-else class="d-flex ms-3 align-items-center gap-2">
    <button class="btn btn-success">Profile</button>
    <button class="btn btn-danger" @click="handleLogout">Logout</button>
  </div>
</div>
</template>