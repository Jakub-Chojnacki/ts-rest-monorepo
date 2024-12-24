import z from "zod";

import { EventSchema } from "./event";

export const ReservationSchema = z.object({
  id: z.string(),
  isCancelled: z.boolean(),
  eventId: z.string(),
  userId: z.string(),
});

export const ReservationSchemaWithEvent = z.object({
  id: z.string(),
  isCancelled: z.boolean(),
  eventId: z.string(),
  userId: z.string(),
  event: EventSchema,
});

export type TReservationWithEvent = z.infer<typeof ReservationSchemaWithEvent>;

export const ReservationParamsSchema = z.object({
  isCancelled: z.boolean().optional(),
});
