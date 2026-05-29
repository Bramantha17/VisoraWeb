<!-- <template>
    <ul class="nav-menu navbar-nav mb-2 mb-lg-0 gap-5">
        <li class="nav-item fs-5 fw=bold" type="button">
            <router-link
            to="/"
            class="nav-link active text-light"
            >Home</router-link>
        </li>
        <li class="nav-item fs-5 fw=bold" type="button">
            <router-link
            to="/productpage"
            class="nav-link text-light"
            >Product</router-link>
        </li>
        <li class="nav-item fs-5 fw=bold" type="button">
            <router-link
            to="/aboutus"
            class="nav-link text-light"
            >About us</router-link>
        </li>
        <li class="nav-item fs-5 fw=bold" type="button">
            <router-link
            to="/contactus"
            class="nav-link text-light"
            >Contact us</router-link>
        </li>
    </ul>
</template> -->

<script setup>
import { computed } from 'vue'

const user = JSON.parse(localStorage.getItem('user'))

const isLogin = computed(() => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  return !!token
})

const isAdmin = computed(() => {
  return user?.role === 'admin'
})
</script>

<template>
<ul class="nav-menu navbar-nav mb-2 mb-lg-0 gap-5">
  <li class="nav-item fs-5" type="button">
      <router-link to="/" class="nav-link active text-light">Home</router-link>
    </li>
    <li class="nav-item fs-5" type="button">
      <router-link to="/productpage" class="nav-link text-light">Product</router-link>
    </li>
    <li class="nav-item fs-5" type="button">
      <router-link to="/aboutus" class="nav-link text-light">About us</router-link>
    </li>
    <li class="nav-item fs-5" type="button">
      <router-link to="/contactus" class="nav-link text-light">Contact us</router-link>
    </li>
    <li v-if="isLogin && isAdmin" class="nav-item fs-5" type="button">
      <router-link to="/admin" class="nav-link text-light">Dashboard</router-link>
    </li>
  </ul>
</template>

