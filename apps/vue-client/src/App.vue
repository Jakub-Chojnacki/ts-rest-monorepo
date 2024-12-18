<script setup lang="ts">
import MainHeader from "./components/MainHeader.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
  <MainHeader />
  <div>initial setup</div>
  <VueQueryDevtools :initial-is-open="true" />
</template>

<style scoped></style>
