<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import useEditSchedule from "@/queries/useEditSchedule";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/AuthStore";

type TProps = {
  scheduleId: string;
  initialEventDuration: number;
};

const { scheduleId, initialEventDuration } = defineProps<TProps>();
const { authHeader } = storeToRefs(useAuthStore());

const formSchema = toTypedSchema(
  z.object({
    eventDuration: z.number().positive(),
  })
);

const { isSubmitting, ...form } = useForm({
  initialValues: {
    eventDuration: initialEventDuration,
  },
  validationSchema: formSchema,
});

const { mutate } = useEditSchedule();

const onSubmit = form.handleSubmit((values) =>
  mutate(
    {
      body: {
        eventDuration: values.eventDuration * 60,
      },
      params: {
        id: scheduleId,
      },
      extraHeaders: authHeader.value,
    },
    {
      onSuccess: () => {},
    }
  )
);
</script>

<template>
  <Card class="mx-auto max-w-sm flex-1 flex flex-col justify-center gap-4">
    <CardContent>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
        <FormField v-slot="{ componentField }" name="eventDuration">
          <FormItem>
            <FormLabel>Czas trwania treningu (w minutach)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                placeholder="Czas trwania treningu"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" :disabled="isSubmitting"> Zapisz </Button>
      </form>
    </CardContent>
  </Card>
</template>
