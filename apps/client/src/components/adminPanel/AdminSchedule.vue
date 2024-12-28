<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import { storeToRefs } from "pinia";
import type { DateRange } from "radix-vue";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { getLocalTimeZone, today } from "@internationalized/date";
import { eachDayOfInterval, format } from "date-fns";

import { useAuthStore } from "@/store/AuthStore";

import useGetSchedule from "@/queries/useGetSchedule";
import useGenerateEvents from "@/queries/useGenerateEvents";

import ScheduleTimer from "./ScheduleTimer.vue";
import Button from "@/components/ui/button/Button.vue";

import { TDayOfWeek, EDaysOfWeek } from "@/types/admin";

const { authHeader } = storeToRefs(useAuthStore());
const { data, isLoading } = useGetSchedule();
const { mutate, isLoading: isGeneratingEvents } = useGenerateEvents();

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

const start = today(getLocalTimeZone());
const end = start.add({ days: 7 });

const selectedDates = ref({
  start,
  end,
}) as Ref<DateRange>;

const getDateFromSelectedDates = (date: DateRange["start"]) => {
  return `${date?.year}-${date?.month}-${date?.day}`;
};
const handleGenerateEvents = () => {
  const { start, end } = selectedDates.value;

  const startDate = getDateFromSelectedDates(start);
  const endDate = getDateFromSelectedDates(end);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const mappedDays = days.map((day) => format(day, "yyyy-MM-dd"));
  const scheduleId = data.value?.body.id;

  if (!scheduleId) return null;

  mutate({
    body: {
      dates: mappedDays,
    },
    params: {
      id: scheduleId,
    },
    extraHeaders: authHeader.value,
  });
};
</script>

<template>
  <div class="flex flex-col gap-4 mt-4">
    <div v-if="!isLoading && data?.body && !isGeneratingEvents">
      <div v-for="day in daysWithTimings" :key="day.day">
        <ScheduleTimer :day="day" :scheduleId="data?.body.id" />
      </div>
      <div class="mt-4 w-fit">
        <RangeCalendar v-model="selectedDates" class="rounded-md border" />
        <Button @click="handleGenerateEvents">Wygeneruj</Button>
      </div>
    </div>
    <div v-if="isLoading">
      <div>Ładowanie...</div>
    </div>
    <div v-if="isGeneratingEvents">
      <div>Trwa generowanie treningów...</div>
    </div>
  </div>
</template>
