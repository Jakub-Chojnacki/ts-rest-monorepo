<script setup lang="ts">
import { CalendarX } from "lucide-vue-next";

import { Card } from "@/components/ui/card";
import CardContent from "@/components/ui/card/CardContent.vue";
</script>

<template>
  <Card class="w-fit h-80 p-4 ml-auto mr-auto mt-8 border-0 shadow-none">
    <CardContent class="flex flex-col items-center justify-center h-full">
      <CalendarX class="h-24 w-24 text-gray-400 mb-4" />
      <h2 class="text-2xl font-bold">Brak rezerwacji</h2>
      <p class="text-center">
        Nie posiadasz żadnych rezerwacji lub żadna z nich nie pasuje do
        wybranego filtra
      </p>
    </CardContent>
  </Card>
</template>
