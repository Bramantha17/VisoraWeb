<script setup>
import WebAdminHeader from '@/components/header/WebHeader.vue'
</script>
<template>
  <div>
    <WebAdminHeader></WebAdminHeader>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
