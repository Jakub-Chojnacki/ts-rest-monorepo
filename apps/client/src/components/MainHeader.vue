<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { storeToRefs } from "pinia"

import { useAuthStore } from "@/store/AuthStore";
;
import useAuthMe from "@/queries/useAuthMe";

import Button from "@/components/ui/button/Button.vue";

const { accessToken } = storeToRefs(useAuthStore());
const { handleLogout } = useAuthStore();
const router = useRouter();

const handleNavigateToReservations = (): void => {
  router.push("/reservations");
};

const handleNavigateToAdminDashboard = (): void => {
  router.push("/admin-dashboard/reservations");
};

const { data } = useAuthMe();
</script>

<template>
  <div class="px-4 gap-2 bg-black text-white h-header flex items-center sticky z-10 top-0">
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
      <Button v-if="data?.body?.role === 'USER'" variant="ghost" type="button"
        @click="handleNavigateToReservations">Moje rezerwacje</Button>
      <Button v-if="data?.body?.role === 'ADMIN'" variant="ghost" type="button"
        @click="handleNavigateToAdminDashboard">Panel admina</Button>
      <Button variant="secondary" type="button" @click="handleLogout">Wyloguj</Button>
    </div>
  </div>
</template>
