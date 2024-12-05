import z from "zod";

import { EventSchema } from "./event";

export const ReservationSchema = z.object({
  id: z.string(),
  isCancelled: z.boolean(),
  eventId: z.string(),
  userId: z.string(),
  event: EventSchema
});

export const ReservationParamsSchema = z.object({
  isCancelled: z.boolean().optional(),
});