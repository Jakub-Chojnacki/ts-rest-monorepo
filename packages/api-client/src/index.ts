import { initContract } from "@ts-rest/core";

import { EventSchema } from "./schemas/event";
import {
  LoginReturnSchema,
  LoginSchema,
  SignupReturnSchema,
  SignupSchema,
} from "./schemas/auth";
import { z } from "zod";

const c = initContract();

export const contract = c.router(
  {
    events: {
      getOne: {
        method: "GET",
        path: "/events/:id",
        responses: {
          200: EventSchema,
        },
      },
      getMany: {
        method: "GET",
        path: "/events",
        query: z.object({
          start: z.string().optional(),
          end: z.string().optional(),
        }),
        responses: {
          200: z.array(EventSchema),
        },
      },
      create: {
        method: "POST",
        path: "/events",
        body: EventSchema.omit({ id: true }),
        responses: {
          201: EventSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/events/:id",
        body: z.object({}),
        responses: {
          200: EventSchema,
        },
      },
      edit: {
        method: "PUT",
        path: "/events/:id",
        body: EventSchema,
        responses: {
          200: EventSchema,
        },
      },
    },

    login: {
      method: "POST",
      path: "/login",
      body: LoginSchema,
      responses: {
        201: LoginReturnSchema,
      },
    },
    signup: {
      method: "POST",
      path: "/signup",
      body: SignupSchema,
      responses: {
        201: SignupReturnSchema,
      },
    },
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
  }
);
