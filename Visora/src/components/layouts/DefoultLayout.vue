<script setup>
import WebHeader from '../header/WebHeader.vue';

</script>

<template>
    <div>
        <WebHeader></WebHeader>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>