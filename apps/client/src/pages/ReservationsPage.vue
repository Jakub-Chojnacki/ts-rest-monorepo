<script setup lang="ts">
import { ref, computed } from "vue";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import MainLayout from "@/components/MainLayout.vue";
import ReservationCard from "@/components/reservationsList/ReservationCard.vue";
import Button from "@/components/ui/button/Button.vue";

import useGetUserReservations from "@/queries/useGetUserReservations";

import { EFilters, EStatus } from "@/types/reservation";
import EmptyReservationCard from "@/components/reservationsList/EmptyReservationCard.vue";

const { data } = useGetUserReservations();

const currentFilter = ref<EFilters>(EFilters.ALL);

const handleChangeFilter = (filter: EFilters) => {
  currentFilter.value = filter;
};

const formattedReservations = computed(() => {
  return data.value?.body.map((reservation) => {
    const startDate = new Date(reservation.event.start);
    const endDate = new Date(reservation.event.end);
    let status = EStatus.UPCOMING;

    if (reservation.isCancelled) {
      status = EStatus.CANCELLED;
    } else if (endDate < new Date()) {
      status = EStatus.FINISHED;
    }

    return {
      ...reservation,
      month: format(startDate, "MMM", { locale: pl }),
      day: format(startDate, "dd", { locale: pl }),
      hour: format(startDate, "HH:mm", { locale: pl }),
      status,
    };
  });
});

const filteredReservations = computed(() => {
  return formattedReservations.value?.filter((reservation) => {
    if (
      currentFilter.value === EFilters.ALL ||
      reservation.status === (currentFilter.value as unknown as EStatus)
    ) {
      return true;
    }

    return false;
  });
});

const filterButtonsConfig = [
  { label: "Wszystkie", filter: EFilters.ALL },
  { label: "Nadchodzące", filter: EFilters.UPCOMING },
  { label: "Zakończone", filter: EFilters.FINISHED },
  { label: "Anulowane", filter: EFilters.CANCELLED },
];
</script>

<template>
  <MainLayout>
    <div class="h-fullNoHeader p-4 relative">
      <div class="flex flex-col items-center justify-between md:flex-row px-4">
        <h2 class="text-center text-2xl my-4 font-bold">Rezerwacje</h2>
        <div>
          <div class="flex gap-2">
            <Button
              v-for="button in filterButtonsConfig"
              :variant="currentFilter === button.filter ? 'default' : 'outline'"
              @click="handleChangeFilter(button.filter)"
              >{{ button.label }}</Button
            >
          </div>
        </div>
      </div>
      <div v-if="data" class="grid gap-2 p-2 reservation-list overflow-auto">
        <ReservationCard
          v-for="reservation in filteredReservations"
          :reservation="reservation"
        />
      </div>
      <EmptyReservationCard  v-if="!filteredReservations?.length"/>
    </div>
  </MainLayout>
</template>

<style scoped>
.reservation-list {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
</style>
