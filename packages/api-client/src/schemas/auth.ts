import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(["ADMIN", "USER"]),
})

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

export const SignupReturnSchemaError = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
});

export type TSignupError = z.infer<typeof SignupReturnSchemaError>;

export const UserAuthMeSchema = z.object({
  userId: z.string(),
  username: z.string(),
  role: z.enum(["ADMIN", "USER"]),
});
