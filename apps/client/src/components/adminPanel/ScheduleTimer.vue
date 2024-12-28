<script setup lang="ts">
import { defineProps, ref } from "vue";
import { parseISO } from "date-fns";
import { TDailyTiming } from "api-contract";
import VueDatePicker from "@vuepic/vue-datepicker";

import Button from "@/components/ui/button/Button.vue";

import { TDayOfWeek } from "@/types/admin";

type TProps = {
  day: TDayOfWeek & { timings?: TDailyTiming };
};

const { day } = defineProps<TProps>();

const defaultTime = {
  hours: "",
  minutes: "",
  seconds: "",
};

const extractDateAndHour = (timestamp?: string) => {
  if (!timestamp) return defaultTime;

  const dateObject = parseISO(timestamp);

  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  return {
    hours,
    minutes,
    seconds: "0",
  };
};

const startTime = ref(extractDateAndHour(day.timings?.start));

const endTime = ref(extractDateAndHour(day.timings?.end));

const isAddingSchedule = ref(false);

const enableIsAddingSchedule = (): void => {
  isAddingSchedule.value = true;
};

const handleSaveSchedule = (): void => {
  //console.log(startTime.value, endTime.value);  //TODO: save schedule mutation
};

const handleDeleteSchedule = (): void => {
  //TODO: delete schedule mutation
  startTime.value = defaultTime;
  endTime.value = defaultTime;
  isAddingSchedule.value = false;
};
</script>

<template>
  <div class="px-4">
    <div class="text-md font-semibold">{{ day.label }}</div>
    <div class="flex gap-4 items-center" v-if="day.timings || isAddingSchedule">
      <VueDatePicker
        v-model="startTime"
        time-picker
        select-text="Zapisz"
        cancel-text="Anuluj"
      />
      <span>-</span>
      <VueDatePicker
        v-model="endTime"
        time-picker
        select-text="Zapisz"
        cancel-text="Anuluj"
      />
      <Button variant="destructive" @click="handleDeleteSchedule">Usuń</Button>
      <Button @click="handleSaveSchedule">Zapisz</Button>
    </div>
    <div v-else class="flex gap-4 items-center">
      <span>Brak grafiku</span>
      <Button variant="outline" @click="enableIsAddingSchedule"
        >Dodaj grafik</Button
      >
    </div>
  </div>
</template>
