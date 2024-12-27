<script setup lang="ts">
import { ref } from "vue";

import MainLayout from "@/components/MainLayout.vue";
import ReservationCard from "@/components/reservationsList/ReservationCard.vue";
import Button from "@/components/ui/button/Button.vue";

import useGetUserReservations from "@/queries/useGetUserReservations";

import { EFilters } from "@/types/reservation";

const { data } = useGetUserReservations()


const currentFilter = ref<EFilters>(EFilters.ALL)

const handleChangeFilter = (filter: EFilters) => {
  currentFilter.value = filter
}

const filterButtonsConfig = [
  { label: "Wszystkie", filter: EFilters.ALL },
  { label: "Nadchodzące", filter: EFilters.UPCOMING },
  { label: "Zakończone", filter: EFilters.FINISHED },
  { label: "Anulowane", filter: EFilters.CANCELLED },
]

</script>

<template>
  <MainLayout>
    <div class="h-fullNoHeader p-4 relative">
      <div class="flex flex-col items-center justify-between md:flex-row">
        <h2 class="text-center text-2xl my-4 font-bold ">Rezerwacje</h2>
        <div>
          <div class="flex gap-2">
            <Button v-for="button in filterButtonsConfig"
              :variant="currentFilter === button.filter ? 'default' : 'outline'"
              @click="handleChangeFilter(button.filter)">{{ button.label
              }}</Button>

          </div>
        </div>
      </div>
      <div v-if="data" class="grid my-4 gap-2 p-2 reservation-list overflow-auto ">
        <ReservationCard v-for="reservation in data.body" :reservation="reservation" :currentFilter="currentFilter" />
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.reservation-list {

  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
</style>
