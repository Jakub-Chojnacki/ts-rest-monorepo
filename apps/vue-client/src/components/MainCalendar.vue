<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const fullCalendar = ref<InstanceType<typeof FullCalendar> | null>(null);
let calApi = null;

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: [
    { title: "event 1", date: "2024-12-12", isReserved:true },
    { title: "event 2", date: "2024-12-13", isReserved:false },
  ],
  eventClick: ({event}) => console.log(event)
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
  >
    <template v-slot:eventContent="arg">
      <b>{{ arg.timeText }}</b>
      <i>{{ arg.event.title }}</i>
    </template>
  </FullCalendar>
</template>
