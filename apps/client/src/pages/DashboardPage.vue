<script setup lang="ts">
import { ref } from "vue";

import ReservationModal from "@/components/ReservationModal.vue";
import MainLayout from "@/components/MainLayout.vue";
import MainCalendar from "@/components/MainCalendar.vue";

import { EventType } from "api-contract";
import useAuthMe from "@/queries/useAuthMe";
import { toast } from "vue-sonner";

const showModal = ref(false);
const selectedEvent = ref<EventType | null>(null);
const { data } = useAuthMe();

const handleSelectEvent = (event: EventType): void => {
  if (data?.value?.body.role === "USER") {
    selectedEvent.value = event;
    showModal.value = true;
  } else {
    toast.error("Administratorzy nie mogą rezerwować wizyt", {
      closeButton: true,
    });
  }
};

const handleCloseModal = (): void => {
  selectedEvent.value = null;
  showModal.value = false;
};
</script>

<template>
  <MainLayout>
    <div class="h-fullNoHeader p-4">
      <MainCalendar @selectEvent="handleSelectEvent" />
      <ReservationModal
        v-if="selectedEvent"
        :showModal="showModal"
        :selectedEvent="selectedEvent"
        :handleCloseModal="handleCloseModal"
      />
    </div>
  </MainLayout>
</template>
