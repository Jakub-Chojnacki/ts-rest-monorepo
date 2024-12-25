<script setup lang="ts">
import MainLayout from "@/components/MainLayout.vue";
import ReservationCard from "@/components/reservationsList/ReservationCard.vue";

import useGetUserReservations from "@/queries/useGetUserReservations";

const { data } = useGetUserReservations()

</script>

<template>
  <MainLayout>
    <div class="h-fullNoHeader p-4">
      <h2 class="text-center text-2xl my-4">Rezerwacje</h2>
      <div v-if="data" class="flex flex-col gap-2">
        <ReservationCard v-for="reservation in data.body" :reservation="reservation" />
      </div>
    </div>
  </MainLayout>
</template>
