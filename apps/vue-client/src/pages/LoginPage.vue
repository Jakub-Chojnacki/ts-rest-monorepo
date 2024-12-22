<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/store/AuthStore";

import MainLayout from "../components/MainLayout.vue";
import LoginForm from "../forms/LoginForm.vue";

const { accessToken } = storeToRefs(useAuthStore());
const router = useRouter();

onMounted(() => {
  if (accessToken.value) router.push("/dashboard");
});
</script>

<template>
  <MainLayout>
    <div class="h-fullNoHeader flex items-center justify-center">
      <LoginForm />
    </div>
  </MainLayout>
</template>

<style scoped></style>
