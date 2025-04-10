<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { TSignupError } from "api-contract";
import { useRouter } from "vue-router";
import { computed } from "vue";

import * as z from "zod";

import useSignup from "@/queries/useSignup";

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
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import { stringRequiredMinCharacters } from "@/schemas/schema-utils";

const router = useRouter();

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: "Pole nie może być puste",
      })
      .email({ message: "Wpisana wartość nie jest poprawnym adresem email" }),
    username: stringRequiredMinCharacters("Nazwa użytkownika", 6),
    password: stringRequiredMinCharacters("Hasło", 6),
  })
);

const { isSubmitting, ...form } = useForm({
  validationSchema: formSchema,
});

const { mutate, error } = useSignup();

const emailAlreadyExistsMessageBackend =
  "User with this email or username already exists";
const emailExistsMessage = "Użytkownik o podanym adresie email już istnieje";
const signupUnknownErrorMessage =
  "Wystąpił błąd podczas rejestracji. Spróbuj ponownie.";

const singupErrorMessage = computed(() => {
  const emailExists =
    (error.value?.body as TSignupError)?.message ===
    emailAlreadyExistsMessageBackend;
  if (emailExists) return emailExistsMessage;

  return signupUnknownErrorMessage;
});

const onSubmit = form.handleSubmit((values) =>
  mutate(
    { body: values },
    {
      onSuccess: () => {
        form.handleReset();
        router.push("/dashboard");
      },
    }
  )
);
</script>

<template>
  <Card class="mx-auto max-w-sm flex-1 flex flex-col justify-center gap-4">
    <CardHeader>
      <CardTitle class="text-2xl">Rejestracja</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Adres email</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Adres email"
                v-bind="componentField"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Nazwa użytkownika</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Nazwa użytkownika"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Hasło</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="******"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div v-if="error" class="text-red-500 text-sm">
          {{ singupErrorMessage }}
        </div>
        <Button type="submit" :disabled="isSubmitting">
          Zarejestruj się
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
