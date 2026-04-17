<script setup>
import { ref } from 'vue'
const first_name =ref('')
const last_name =ref('')
const email = ref('')
const password = ref('')
const emit = defineEmits(['submit'])

const submitForm = () => {
  emit('submit', {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    password: password.value
  })
}
</script>

<template>
  <div class="">
    <div class="row p-4">
      <h1>Signup</h1>
      <div class="col-md-3">
        <span class="d-block mb-2">Nama depan</span>
        <input type="text" placeholder="Diablo"  class="" v-model="first_name">
      </div>
      <div class="col-md-3">
        <span class="d-block mb-2">Nama belakang</span>
        <input type="text" placeholder="Jhonson" class="" v-model="last_name">
      </div>
      <div class="row p-2">
        <div class="col-md-3">
          <span class="d-block mb-2">Gmail</span>
          <input v-model="email" type="email" class="" placeholder="example@gmail.com">
        </div>
      </div>
      <div class="row p-2">
        <div class="col-md-3">
          <span class="d-block mb-2">Password</span>
          <input v-model="password" type="password" class="form-control" placeholder="example123">
        </div>
      </div>
    </div>
     <button class="mt-3" @click="submitForm">Register</button>
  </div>
</template>