<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import Button from "@/components/ui/button/Button.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/AuthStore";

const { accessToken } = storeToRefs(useAuthStore());
const { handleLogout } = useAuthStore();
const router = useRouter()

const handleNavigateToReservations = (): void => {
  router.push('/reservations')
}
</script>

<template>
  <div class="px-4 gap-2 bg-black text-white h-header flex items-center">
    <RouterLink to="/" class="font-bold">CodeFitness</RouterLink>
    <div class="flex gap-4 items-center ml-auto" v-if="!accessToken">
      <RouterLink to="/login">
        <Button variant="secondary" type="button"> Logowanie</Button>
      </RouterLink>
      <RouterLink to="/signup">
        <Button variant="ghost" type="button">Rejestracja</Button>
      </RouterLink>
    </div>
    <div class="flex gap-4 items-center ml-auto" v-if="accessToken">
      <Button variant="ghost" @click="handleNavigateToReservations" type="button">Moje rezerwacje</Button>
      <Button @click="handleLogout" variant="secondary" type="button">Wyloguj</Button>
    </div>
  </div>
</template>

<style scoped></style>
