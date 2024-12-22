<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import plLocale from "@fullcalendar/core/locales/pl";
import interactionPlugin from "@fullcalendar/interaction";
import apiClient from "@/api-client";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/AuthStore";

const fullCalendar = ref<InstanceType<typeof FullCalendar> | null>(null);
let calApi = null;

const { authHeader } = storeToRefs(useAuthStore());

const { data, isLoading } = apiClient.events.getMany.useQuery(
  ["allEvents"],
  () => ({
    extraHeaders: authHeader.value,
  })
);

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  locale: plLocale,
  headerToolbar: {
    left: "prev,today,next",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  events: data.value?.body || [],
});

watch(data, () => {
  if (data.value && data.value.body) {
    calendarOptions.events = data.value.body; //we have to update it imperatively because otherwise it won't be reactive
  }
});

onMounted(() => {
  calApi = fullCalendar.value?.getApi();
});
</script>

<template>
  <FullCalendar
    class="max-h-[100%]"
    ref="fullCalendar"
    :options="calendarOptions"
    v-if="!isLoading"
  >
    <template v-slot:eventContent="arg">
      <div
        class="w-full"
        :class="`${arg.event.extendedProps.isBooked ? 'bg-red-400' : 'bg-green-300'}`"
      >
        <b>{{ arg.timeText }}</b>
        <i>Blok treningowy</i>
      </div>
    </template>
  </FullCalendar>
</template>
