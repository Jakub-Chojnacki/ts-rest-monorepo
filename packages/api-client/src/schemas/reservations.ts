import z from "zod";

export const ReservationSchema = z.object({
  id: z.string(),
  isCancelled: z.boolean(),
  eventId: z.string(),
  userId: z.string(),
});

export const ReservationParamsSchema = z.object({
  isCancelled: z.boolean().optional(),
});