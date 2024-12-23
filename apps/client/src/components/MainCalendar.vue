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
import { EventType } from "api-contract";
import { CalendarOptions, EventClickArg } from "@fullcalendar/core/index.js";

const emit = defineEmits(["selectEvent"]);
const fullCalendar = ref<InstanceType<typeof FullCalendar> | null>(null);
let calApi = null;

const { authHeader } = storeToRefs(useAuthStore());

const { data, isLoading } = apiClient.events.getMany.useQuery(
  ["allEvents"],
  () => ({
    extraHeaders: authHeader.value,
  })
);

const handleEventClick = ({ event }: EventClickArg): void => {
  if (event.extendedProps.isBooked) return;
  //For some reason there isn't a simple way to extract all of the event data so we have to merge it back manually
  const fullEvent: EventType = {
    id: event.id,
    title: event.title,
    start: event.start as Date, //It must be present, otherwise the event wouldn't be displayed
    end: event.end as Date,
    isBooked: event.extendedProps.isBooked,
  };
  emit("selectEvent", fullEvent);
};

const calendarOptions = reactive<CalendarOptions>({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  locale: plLocale,
  headerToolbar: {
    left: "prev,today,next",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  eventTimeFormat: {
    hour: "2-digit",
    minute: "2-digit",
  },
  eventClick: handleEventClick,
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
        class="w-full h-full"
        :class="`${arg.event.extendedProps.isBooked ? 'bg-red-400 cursor-not-allowed' : 'bg-green-300 cursor-pointer'}`"
      >
        <b class="mr-1">{{ arg.timeText }}</b>
        <i>Blok treningowy</i>
      </div>
    </template>
  </FullCalendar>
</template>
