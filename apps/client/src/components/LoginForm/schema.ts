import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().min(6, {
    message: "Login musi być dłuższy niż 6 znaków",
  }),
  password: z.string().min(6, {
    message: "Hasło musi być dłuższe niż 6 znaków",
  }),
});

export type TLoginFormInput = z.input<typeof loginFormSchema>;
