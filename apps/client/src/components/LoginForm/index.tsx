"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { loginFormSchema, TLoginFormInput } from "./schema";

const LoginForm = () => {
  const { setAuthData } = useAuth();

  const form = useForm<TLoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate } = apiClient.login.useMutation({
    onSuccess: ({ body: { access_token, userId } }) => {
      setAuthData(access_token, userId);
      toast(
        "Udało się zalogować. Zostaniesz przeniesiony/a do ekranu głównego!"
      );
    },
    onError: () => {
      form.setError("root", {
        message:
          "Wystąpił błąd! Upewnij się, że podałeś/aś poprawny login i hasło",
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
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                Zaloguj się
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
