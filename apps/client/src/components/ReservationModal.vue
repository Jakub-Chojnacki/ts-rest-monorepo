<script setup lang="ts">
import { storeToRefs } from "pinia";
import apiClient from "@/api-client";
import { EventType } from "api-contract";

import { useAuthStore } from "@/store/AuthStore";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/ui/button/Button.vue";

import getReadableDate from "@/utils/getReadableDate";

type TProps = {
  showModal: boolean;
  handleCloseModal: () => void;
  selectedEvent: EventType;
};

const { showModal, handleCloseModal, selectedEvent } = defineProps<TProps>();
const { authHeader, userId } = storeToRefs(useAuthStore());

const { mutate } = apiClient.reservations.create.useMutation();

const handleCreateReservation = (): void => {
  if (!userId.value) return;
  mutate({
    body: {
      eventId: selectedEvent.id,
      userId: userId.value,
      isCancelled: false,
    },
    extraHeaders: authHeader.value,
  });
};
</script>

<template>
  <Dialog :open="showModal" @update:open="handleCloseModal">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Zarezerwuj trening</DialogTitle>
        <DialogDescription>
          <div>
            <p>Trening personalny</p>
            <p>Start: {{ getReadableDate(selectedEvent.start) }}</p>
            <p>Koniec: {{ getReadableDate(selectedEvent.end) }}</p>
          </div>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <div className="flex gap-4">
          <Button variant="ghost" @click="handleCreateReservation">
            Zarezerwuj
          </Button>
          <Button @click="handleCloseModal">Anuluj</Button>
        </div></DialogFooter
      >
    </DialogContent>
  </Dialog>
</template>
