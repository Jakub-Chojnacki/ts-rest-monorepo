<script setup lang="ts">
import { TReservationWithEvent } from "api-contract";
import apiClient from "@/api-client";
import { storeToRefs } from "pinia";
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
import { queryClient } from "@/lib/vue-query";
import { toast } from "vue-sonner";

type TProps = {
  showModal: boolean;
  handleCloseModal: () => void;
  selectedReservation: TReservationWithEvent;
};

const { showModal, handleCloseModal, selectedReservation } =
  defineProps<TProps>();

const { authHeader } = storeToRefs(useAuthStore());

const { mutate } = apiClient.reservations.cancel.useMutation({
  onSuccess: () => {
    queryClient.invalidateQueries(["allReservations"]);
    handleCloseModal();
  },
  onError: () => {
    toast.error(
      "Wystąpił błąd poczas anulowania rezerwacji. Spróbuj ponownie."
    );
  },
});

const handleCancelReservation = (): void => {
  mutate({
    params: {
      id: selectedReservation.id,
    },
    extraHeaders: authHeader.value
  });
};
</script>

<template>
  <Dialog :open="showModal" @update:open="handleCloseModal">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Anulowanie rezerwacji</DialogTitle>
        <DialogDescription>
          <div>
            Czy na pewno chcesz anulować rezerwację dnia
            {{ getReadableDate(selectedReservation.event.start) }}?
          </div>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <div className="flex gap-4">
          <Button variant="destructive" @click="handleCancelReservation">
            Anuluj rezerwację
          </Button>
          <Button @click="handleCloseModal">Zamknij</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
