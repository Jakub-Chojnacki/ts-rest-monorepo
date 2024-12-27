<script setup lang="ts">
import { ref, computed } from 'vue'

import useGetAdminReservations from '@/queries/useGetAdminReservations';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button';

import getReadableDate from '@/utils/getReadableDate';

import { EFilters } from '@/types/reservation';
import EmptyReservationCard from '../reservationsList/EmptyReservationCard.vue';

const currentFilter = ref(EFilters.ALL)
const isCancelled = computed(() => currentFilter.value === EFilters.CANCELLED)
const isUpcoming = computed(() => currentFilter.value === EFilters.UPCOMING)

const { data } = useGetAdminReservations({
    isCancelled: isCancelled,
    isUpcoming: isUpcoming,
})

const filterButtonsConfig = [
    { label: "Wszystkie", filter: EFilters.ALL },
    { label: "Nadchodzące", filter: EFilters.UPCOMING },
    { label: "Zakończone", filter: EFilters.FINISHED },
    { label: "Anulowane", filter: EFilters.CANCELLED },
];

const handleChangeFilter = (filter: EFilters) => {
    currentFilter.value = filter;
};

</script>

<template>
    <div>
        <div class="flex gap-2 py-4">
            <Button v-for="button in filterButtonsConfig"
                :variant="currentFilter === button.filter ? 'default' : 'outline'"
                @click="handleChangeFilter(button.filter)">{{ button.label }}</Button>
        </div>
    </div>
    <Table v-if="data?.body.length">
        <TableHeader>
            <TableRow>
                <TableHead>Data startu</TableHead>
                <TableHead>Użytkownik</TableHead>
                <TableHead>Anulowana</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="reservation in data.body" :key="reservation.id">
                <TableCell>{{ getReadableDate(reservation.event.start) }}</TableCell>
                <TableCell>{{ reservation.user.username }}</TableCell>
                <TableCell>{{ reservation.isCancelled ? 'Tak' : 'Nie' }}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <EmptyReservationCard v-else/>
</template>