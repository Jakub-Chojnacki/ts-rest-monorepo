<script setup lang="ts">
import { ref } from "vue";

import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Button from "@/components/ui/button/Button.vue";
import Badge from "@/components/ui/badge/Badge.vue";
import ReservationCancelModal from '@/components/reservationsList/ReservationCancelModal.vue'

import { EStatus, TReservationWithStatus } from "@/types/reservation";

type TProps = {
  reservation: TReservationWithStatus;
};

const { reservation } = defineProps<TProps>();

const showModal = ref(false);

const getBadgeVariant = (status: EStatus) => {
  if (status === EStatus.UPCOMING) {
    return "outline";
  } else if (status === EStatus.FINISHED) {
    return "secondary";
  } else {
    return "destructive";
  }
};

const handleCloseModal = (): void => {
  showModal.value = false;
};

const handleOpenModal = (): void => {
  showModal.value = true;
};

</script>

<template>
  <Card class="mx-auto flex-1 flex flex-col justify-center gap-4">
    <CardContent class="flex gap-2 p-0 shadow-lg">
      <div class="p-2 min-w-64 flex flex-col">
        <Badge
          :variant="getBadgeVariant(reservation.status)"
          class="w-fit text-[0.625rem]"
        >
          {{ reservation.status.toUpperCase() }}
        </Badge>
        <div class="font-bold my-2">Trening Personalny</div>
        <div class="mt-auto">
          <Button
            variant="destructive"
            size="sm"
            @click="handleOpenModal"
            :disabled="reservation.status !== EStatus.UPCOMING"
            >Anuluj rezerwację</Button
          >
        </div>
      </div>
      <div class="flex flex-col gap-2 border-l-2 py-4 px-12 items-center">
        <div>{{ reservation.month }}</div>
        <div class="font-bold text-xl">{{ reservation.day }}</div>
        <div>{{ reservation.hour }}</div>
      </div>
    </CardContent>
  </Card>
  <ReservationCancelModal
    :showModal="showModal"
    :handleCloseModal="handleCloseModal"
    :selected-reservation="reservation"
  />
</template>
