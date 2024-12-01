import { z } from "zod";

export const signupFormSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6),
});

export type TSignupFormInput = z.input<typeof signupFormSchema>;
