import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export type Todo = z.infer<typeof TodoSchema>;

export const contract = c.router(
  {},
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
  }
);
