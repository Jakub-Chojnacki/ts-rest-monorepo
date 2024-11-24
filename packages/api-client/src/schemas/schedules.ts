import z from "zod";

const daysOfWeek = z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]);

export const ScheduleSchema = z.object({
    id: z.string(),
    start: z.date(),
    end: z.date(),
    userId: z.string(),
    duration: z.number(),
    daysOfWeek: z.array(daysOfWeek),
})

export type TSchedule = z.infer<typeof ScheduleSchema>;