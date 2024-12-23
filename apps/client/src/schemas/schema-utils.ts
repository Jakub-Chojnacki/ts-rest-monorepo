import z from "zod";

export const stringRequiredMinCharacters = (name: string, length: number) =>
  z
    .string({
      required_error: "Pole nie może być puste",
    })
    .min(length, { message: `${name} musi mieć minimum ${length} znaków` });
