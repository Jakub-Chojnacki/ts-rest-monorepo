import z from "zod";

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  isBooked: z.coerce.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type EventType = z.infer<typeof EventSchema>