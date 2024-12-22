<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/store/AuthStore";

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
import apiClient from "@/api-client";
import { toast } from "vue-sonner";

const router = useRouter();
const { handleLogin } = useAuthStore();

const formSchema = toTypedSchema(
  z.object({
    username: z.string(),
    password: z
      .string()
      .min(6, { message: "Hasło musi być dłuższe niż 5 znaków" }),
  })
);

const { isSubmitting, ...form } = useForm({
  validationSchema: formSchema,
});

const { mutate } = apiClient.login.useMutation({
  onSuccess: ({ body }) => {
    toast.success(
      "Udało się zalogować. Zostaniesz przeniesiony/a do ekranu głównego!"
    );
    handleLogin(body.access_token);
    form.handleReset();
    router.push("/dashboard"); 
  },
  onError: () => {
    toast.error("Wystąpił błąd podczas logowania!");
  },
});

const onSubmit = form.handleSubmit((values) => mutate({ body: values }));
</script>

<template>
  <Card class="mx-auto max-w-sm flex-1 flex flex-col justify-center gap-4">
    <CardHeader>
      <CardTitle class="text-2xl">Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="flex flex-col gap-4">
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
        <Button type="submit" :disabled="isSubmitting"> Zaloguj się </Button>
      </form>
    </CardContent>
  </Card>
</template>
