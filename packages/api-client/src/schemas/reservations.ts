import z from "zod";

import { EventSchema } from "./event";
import { UserSchema } from "./auth";

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

export const ReservationSchemaWithEventAndUser = z.object({
  id: z.string(),
  isCancelled: z.boolean(),
  eventId: z.string(),
  userId: z.string(),
  event: EventSchema,
  user: UserSchema,
});

export type TReservationWithEvent = z.infer<typeof ReservationSchemaWithEvent>;

export const ReservationParamsSchema = z.object({
  isCancelled: z.string().optional(),
  isUpcoming: z.string().optional(),
});
