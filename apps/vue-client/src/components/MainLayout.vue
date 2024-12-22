<script setup lang="ts">
import MainHeader from "./MainHeader.vue";
</script>

<template>
  <div class="min-h-[100dvh]">
    <MainHeader />
    <slot />
  </div>
</template>

<style scoped></style>
