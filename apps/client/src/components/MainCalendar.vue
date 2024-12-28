<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import plLocale from "@fullcalendar/core/locales/pl";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions, EventClickArg } from "@fullcalendar/core/index.js";
import { EventType } from "api-contract";

import useGetAllEvents from "@/queries/useGetAllEvents";

const emit = defineEmits(["selectEvent"]);
const fullCalendar = ref<InstanceType<typeof FullCalendar> | null>(null);

const { data, isLoading } = useGetAllEvents();

const handleEventClick = ({ event }: EventClickArg): void => {
  if (event.extendedProps.isBooked || (event.start as Date) < new Date())
    return;
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

const eventStatusStyles = (isBooked: boolean, start: Date): string => {
  if (start < new Date()) {
    return "bg-gray-300 cursor-not-allowed";
  }

  return isBooked
    ? "bg-red-400 cursor-not-allowed"
    : "bg-green-300 cursor-pointer";
};
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
        :class="
          eventStatusStyles(arg.event.extendedProps.isBooked, arg.event.start)
        "
      >
        <b class="mr-1">{{ arg.timeText }}</b>
        <i>Blok treningowy</i>
      </div>
    </template>
  </FullCalendar>
  <div v-if="isLoading">
    <Spinner />
  </div>
</template>
