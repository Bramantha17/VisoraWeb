<script setup>
import HeroLeft from './HeroLeft.vue';
import HeroRight from './HeroRight.vue';

</script>
<template>
 <section class="hero-section">
    <div class="hero-contain">
       <div class="hero d-flex" style="gap: 24px;">
            <HeroLeft></HeroLeft>
            <HeroRight></HeroRight>
       </div>
    </div>
 </section>
 </template>