<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { RouterView } from "vue-router";
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <RouterView />
  <Toaster position="top-right" />
  <VueQueryDevtools :initial-is-open="true" />
</template>

<style scoped></style>
