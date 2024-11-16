import z from "zod";

const daysOfWeek = z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]);

export const ScheduleSchema = z.object({
    id: z.string(),
    start: z.string(),
    end: z.string(),
    userId: z.string(),
    duration: z.number(),
    daysOfWeek: z.array(daysOfWeek),
})