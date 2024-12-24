<script setup lang="ts">
import { computed, ref } from "vue";
import { TReservationWithEvent } from "api-contract";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Button from "@/components/ui/button/Button.vue";
import Badge from "@/components/ui/badge/Badge.vue";

import { EStatus } from "@/types/reservation";
import ReservationCancelModal from "./ReservationCancelModal.vue";

type TProps = {
  reservation: TReservationWithEvent;
};

const { reservation } = defineProps<TProps>();

const showModal = ref(false);

const formattedReservation = computed(() => {
  const startDate = new Date(reservation.event.start);
  const endDate = new Date(reservation.event.end);
  let status = EStatus.UPCOMING;

  if (reservation.isCancelled) {
    status = EStatus.CANCELLED;
  } else if (endDate < new Date()) {
    status = EStatus.FINISHED;
  }

  return {
    ...reservation,
    month: format(startDate, "MMM", { locale: pl }),
    day: format(startDate, "dd", { locale: pl }),
    hour: format(startDate, "HH:mm", { locale: pl }),
    status,
  };
});

const getBadgeVariant = (status: string) => {
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
          :variant="getBadgeVariant(formattedReservation.status)"
          class="w-fit text-[0.625rem]"
        >
          {{ formattedReservation.status.toUpperCase() }}
        </Badge>
        <div class="font-bold my-2">Trening Personalny</div>
        <div class="mt-auto">
          <Button
            variant="destructive"
            size="sm"
            @click="handleOpenModal"
            :disabled="formattedReservation.status !== EStatus.UPCOMING"
            >Anuluj rezerwację</Button
          >
        </div>
      </div>
      <div class="flex flex-col gap-2 border-l-2 py-4 px-12 items-center">
        <div>{{ formattedReservation.month }}</div>
        <div class="font-bold text-xl">{{ formattedReservation.day }}</div>
        <div>{{ formattedReservation.hour }}</div>
      </div>
    </CardContent>
  </Card>
  <ReservationCancelModal
    :showModal="showModal"
    :handleCloseModal="handleCloseModal"
    :selected-reservation="reservation"
  />
</template>
