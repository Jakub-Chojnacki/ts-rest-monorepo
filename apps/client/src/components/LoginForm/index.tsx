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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import apiClient from "@/api-client";
import useToken from "@/hooks/useToken";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6),
});

type TLoginFormInput = z.input<typeof formSchema>;

const LoginForm = () => {
  const { setToken, token } = useToken();

  console.log(token)
  const form = useForm<TLoginFormInput>({
    resolver: zodResolver(formSchema),
  });

  const { mutate } = apiClient.login.useMutation({
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
    form.clearErrors()
    mutate({ body: values });
  };

  return (
    <Card className="mx-auto max-w-sm">
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
