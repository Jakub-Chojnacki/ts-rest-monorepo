<script setup lang="ts">
import { defineProps, ref } from "vue";
import { storeToRefs } from "pinia";
import { parseISO } from "date-fns";
import { TDailyTiming } from "api-contract";
import VueDatePicker from "@vuepic/vue-datepicker";

import { useAuthStore } from "@/store/AuthStore";

import useDeleteTiming from "@/queries/useDeleteTiming";
import useCreateTiming from "@/queries/useCreateTiming";
import useEditTiming from "@/queries/useEditTiming";

import Button from "@/components/ui/button/Button.vue";

import { TDayOfWeek } from "@/types/admin";

type TProps = {
  day: TDayOfWeek & { timing?: TDailyTiming };
  scheduleId: string;
};

const { day, scheduleId } = defineProps<TProps>();
const { mutate: deleteTiming } = useDeleteTiming();
const { mutate: createTiming } = useCreateTiming();
const { mutate: editTiming } = useEditTiming();

const { authHeader } = storeToRefs(useAuthStore());

type TSingleTime = {
  hours: string;
  minutes: string;
  seconds: string;
};

const defaultTime: TSingleTime = {
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

const startTime = ref<TSingleTime>(
  extractDateAndHour(day.timing?.start as string)
);

const endTime = ref<TSingleTime>(extractDateAndHour(day.timing?.end as string));

const isAddingSchedule = ref(false);

const enableIsAddingSchedule = (): void => {
  isAddingSchedule.value = true;
};

const convertTimeToString = (timeString: TSingleTime) => {
  const { hours, minutes, seconds } = timeString;

  const todayMidnight = new Date();
  todayMidnight.setHours(Number(hours));
  todayMidnight.setMinutes(Number(minutes));
  todayMidnight.setSeconds(Number(seconds));

  return todayMidnight.toISOString();
};

const handleSaveSchedule = (): void => {
  if (day.timing) {
    editTiming({
      params: {
        timingId: day.timing.id,
      },
      body: {
        dayOfWeek: day.day,
        start: convertTimeToString(startTime.value),
        end: convertTimeToString(endTime.value),
        scheduleId,
      },
      extraHeaders: authHeader.value,
    });
  } else {
    createTiming({
      params: {
        scheduleId,
      },
      body: {
        dayOfWeek: day.day,
        start: convertTimeToString(startTime.value),
        end: convertTimeToString(endTime.value),
        scheduleId,
      },
      extraHeaders: authHeader.value,
    });
  }

  isAddingSchedule.value = false;
};

const handleDeleteSchedule = (): void => {
  if (day.timing) {
    deleteTiming({
      params: { timingId: day.timing.id },
      body: {},
      extraHeaders: authHeader.value,
    });
  }

  startTime.value = defaultTime;
  endTime.value = defaultTime;
  isAddingSchedule.value = false;
};
</script>

<template>
  <div class="px-4">
    <div class="text-md font-semibold">{{ day.label }}</div>
    <div class="flex gap-4 items-center" v-if="day.timing || isAddingSchedule">
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
