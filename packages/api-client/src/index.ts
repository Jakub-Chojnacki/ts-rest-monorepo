import { initContract } from "@ts-rest/core";

import { EventSchema } from "./schemas/event";

const c = initContract();

export const contract = c.router(
  {
    events: {
      create: {
        method: "POST",
        path: "/events",
        body: EventSchema.omit({ id: true }),
        responses: {
          201: EventSchema,
        },
      },
    },
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
  }
);
