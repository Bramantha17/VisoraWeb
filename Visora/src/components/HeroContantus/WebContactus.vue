<script setup>
import HeroContactus from './HeroContactus.vue';

</script>

<template>
  <div class="position-relative p-5" style="background-color: rgba(10, 61, 98, 1);">
    <div class="position-absolute top-49 start-0 w-100 h-100 overflow-hidden">
      <svg
        width="100%"
        height="105%"
        viewBox="0 0 1440 590"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stop-color="#409bac"></stop>
            <stop offset="95%" stop-color="#ffd300"></stop>
          </linearGradient>
        </defs>
        <path
          id="wavePath"
          d="M0,600 L0,150 C133,175 267,199 434,184 C600,169 800,114 973,102 C1146,90 1293,120 1440,150 L1440,600 L0,600 Z"
          fill="url(#gradient)"
          fill-opacity="0.73"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M0,600 L0,150 C133,175 267,199 434,184 C600,169 800,114 973,102 C1146,90 1293,120 1440,150 L1440,600 L0,600 Z;
              M0,600 L0,150 C191,172 382,195 533,176 C684,157 794,98 938,87 C1082,76 1261,113 1440,150 L1440,600 L0,600 Z;
              M0,600 L0,150 C133,175 267,199 434,184 C600,169 800,114 973,102 C1146,90 1293,120 1440,150 L1440,600 L0,600 Z
            "
          />
        </path>
      </svg>
    </div>
    <div class="position-relative">
      <HeroContactus />
    </div>
  </div>
</template>
