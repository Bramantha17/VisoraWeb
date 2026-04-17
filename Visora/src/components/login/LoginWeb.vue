<template>
  <div class="login-background d-flex">
    <div>
      <LoginWave class="flex-1"></LoginWave>
    </div>
    <div>
       <LoginForm class="flex-1"></LoginForm>                             
    </div>
  </div>
</template>

<script setup>
import LoginForm from './LoginForm.vue'
import LoginWave from './LoginWave.vue'
</script>

