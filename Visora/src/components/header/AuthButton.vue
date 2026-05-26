<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))

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
        <button class="btn btn-warning rounded-3" style="width: 130px; height: 45px;">
          Login
        </button>
      </RouterLink>
      <RouterLink to="/signinpage" class="ms-4">
        <button class="btn btn-outline-warning rounded-3" style="width: 130px; height: 45px;">
          Sign Up
        </button>
      </RouterLink>
    </div>

    <div v-else>
      <div class="dropdown p-3">
        <button class="profile text-light dropdown-toggle" type="button"
          data-bs-toggle="dropdown" aria-expanded="false">
          {{ user?.first_name }}
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item disabled text-muted small">
            {{ user?.email }}
          </li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#" @click="handleLogout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>