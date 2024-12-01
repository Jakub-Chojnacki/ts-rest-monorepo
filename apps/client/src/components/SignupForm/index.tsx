"use client";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import apiClient from "@/api-client";
import useToken from "@/hooks/useToken";

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6),
});

type TLoginFormInput = z.input<typeof formSchema>;

const SignupForm = () => {
  const { setToken } = useToken();

  const form = useForm<TLoginFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const { mutate } = apiClient.signup.useMutation({
    onSuccess: (data) => {
      setToken(data.body.access_token);
    },
    onError: () => {
      form.setError("root", {
        message:
          "Wystąpił błąd! Upewnij się, że podałeś poprawny login i hasło",
      });
    },
  });

  const onSubmit = (values: TLoginFormInput): void => {
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
