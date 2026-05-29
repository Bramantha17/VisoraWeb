<script setup></script>

<!-- AuthBackground.vue -->
<template>
  <div class="auth-bg position-relative w-100 h-100">
    <img src="@/assets/image/Wave.png" class="wave-img" alt="Wave Background" />

    <div class="position-absolute top-0 start-0 p-3">
      <RouterLink to="/">
        <img src="@/assets/image/Visora_logo.png" height="60" />
      </RouterLink>

      <div class="title-login">
        <h1 class="text-warning p-5">
          Selamat <br />
          Kembali!
        </h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-bg {
  overflow: hidden;
}

.wave-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
