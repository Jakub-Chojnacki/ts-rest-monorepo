import z from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const LoginReturnSchema = z.object({
  access_token: z.string(),
  userId: z.string(),
});

export type TReturnedUser = z.infer<typeof LoginReturnSchema>;

export const SignupSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

export const SignupReturnSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  id: z.string(),
  access_token: z.string(),
});
