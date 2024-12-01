"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import apiClient from "@/api-client";

import useAuth from "@/hooks/useAuth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { TSignupFormInput, signupFormSchema } from "./schema";

const SignupForm = () => {
  const { setAuthData } = useAuth();

  const form = useForm<TSignupFormInput>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const { mutate } = apiClient.signup.useMutation({
    onSuccess: (data) => {
      setAuthData(data.body.access_token, data.body.id);
      toast(
        "Konto zostało utworzone. Zostaniesz przeniesiony/a do ekranu głównego!"
      );
    },
    onError: () => {
      form.setError("root", {
        message: "Wystąpił błąd podczas tworzenia konta! Spróbuj ponownie.",
      });
    },
  });

  const onSubmit = (values: TSignupFormInput): void => {
    form.clearErrors();
    mutate({ body: values });
  };

  return (
    <Card className="mx-auto max-w-sm flex-1">
      <CardHeader>
        <CardTitle className="text-2xl">Rejestracja</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres email</FormLabel>
                    <FormControl>
                      <Input placeholder="Adres email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa użytkownika</FormLabel>
                    <FormControl>
                      <Input placeholder="Nazwa użytkownika" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input placeholder="******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <span className="text-red-600">
                  {form.formState.errors.root.message}
                </span>
              )}
              <Button type="submit" className="w-full">
                Zarejestruj się
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
