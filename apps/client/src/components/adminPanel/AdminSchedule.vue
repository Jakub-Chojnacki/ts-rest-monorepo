<script setup lang="ts">
import { computed } from "vue";

import useGetSchedule from "@/queries/useGetSchedule";

import ScheduleTimer from "./ScheduleTimer.vue";

import { TDayOfWeek, EDaysOfWeek } from "@/types/admin";

const { data, isLoading } = useGetSchedule();

const daysOfWeek: TDayOfWeek[] = [
  {
    day: EDaysOfWeek.MONDAY,
    label: "Poniedziałek",
  },
  {
    day: EDaysOfWeek.TUESDAY,
    label: "Wtorek",
  },
  {
    day: EDaysOfWeek.WEDNESDAY,
    label: "Środa",
  },
  {
    day: EDaysOfWeek.THURSDAY,
    label: "Czwartek",
  },
  {
    day: EDaysOfWeek.FRIDAY,
    label: "Piątek",
  },
  {
    day: EDaysOfWeek.SATURDAY,
    label: "Sobota",
  },
  {
    day: EDaysOfWeek.SUNDAY,
    label: "Niedziela",
  },
];

const daysWithTimings = computed(() => {
  return daysOfWeek.map((day) => {
    const timing = data.value?.body.dailyTimings?.find(
      (timing) => timing.dayOfWeek === day.day
    );

    return {
      ...day,
      timing,
    };
  });
});
</script>

<template>
  <div class="flex flex-col gap-4 mt-4">
    <div v-if="!isLoading && data?.body">
      <div v-for="day in daysWithTimings" :key="day.day">
        <ScheduleTimer :day="day" :scheduleId="data?.body.id" />
      </div>
    </div>
    <div v-if="isLoading">
      <div>Ładowanie...</div>
    </div>
  </div>
</template>
