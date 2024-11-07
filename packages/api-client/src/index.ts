import { initContract } from "@ts-rest/core";

import { EventSchema } from "./schemas/event";
import {
  LoginReturnSchema,
  LoginSchema,
  SignupReturnSchema,
  SignupSchema,
} from "./schemas/auth";

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
