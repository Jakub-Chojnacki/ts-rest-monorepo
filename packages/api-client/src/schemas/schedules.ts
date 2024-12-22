import z from "zod";

const daysOfWeek = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

const DailyTimingSchema = z.object({
  id: z.string(),
  dayOfWeek: daysOfWeek,
  start: z.date(),
  end: z.date(),
  scheduleId: z.string(),
});

export const ScheduleSchema = z.object({
  id: z.string(),
  dailyTimings: z.array(DailyTimingSchema),
  eventDuration: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
});

export const ScheduleSchemaPost = z.object({
  dailyTimings: z.array(DailyTimingSchema),
  eventDuration: z.number(),
  userId: z.string(),
});

export type TSchedule = z.infer<typeof ScheduleSchema>;

export type TDailyTiming = z.infer<typeof DailyTimingSchema>;
