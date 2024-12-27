import { z } from "zod";

export const UnauthorizedSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
});
