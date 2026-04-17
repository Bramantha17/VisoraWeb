<script setup>
import ButtonKontakkami from '../auth/ButtonKontakkami.vue';
</script>

<template>
  <div class="hero-right position-relative text-center text-white">
    <img src="@/assets/image/HeroPicture.png" style="width:100%;height: 557px;">

    <div class="position-absolute top-50 start-50 translate-middle text-center">
      <h1
        style="
        color: #FFD700;
        font-size: 85px;"
        class="fw-bold"
        id="h1-fast-pack">
        FAST PACK
      </h1>

      <p class="fw-bold">The worst even your personal best.</p>
      <ButtonKontakkami></ButtonKontakkami>
    </div>
  </div>
</template>