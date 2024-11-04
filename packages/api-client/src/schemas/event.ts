import z from "zod";

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  start: z.date(),
  end: z.date(),
  isBooked: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});
