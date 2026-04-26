<script setup>
import NavigationBar from '../header/NavigationBar.vue';
import AuthButton from './AuthButton.vue';
</script>

<template>
    <header class="navigationbar shadow-sm container-fluid py-0 border-buttom fixed-top" >
        <div class="container-md d-flex justify-content-between">
            <img class="navbar-logo" src="@/assets/image/Visora_logo.png">
            <div class="d-flex align-items-center gap-4">
                <NavigationBar></NavigationBar>
                <AuthButton></AuthButton>
            </div>
        </div>
    </header>
</template> 