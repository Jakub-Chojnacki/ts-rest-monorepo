import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EventSchema } from "./schemas/event";
import {
  LoginReturnSchema,
  LoginSchema,
  SignupReturnSchema,
  SignupSchema,
} from "./schemas/auth";
import {
  ReservationParamsSchema,
  ReservationSchema,
} from "./schemas/reservations";
import { ScheduleSchema, ScheduleSchemaPost } from "./schemas/schedules";

const c = initContract();

export * from "./schemas/event";
export * from "./schemas/auth";
export * from "./schemas/reservations";
export * from "./schemas/schedules";

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

    reservations: {
      create: {
        method: "POST",
        path: "/reservations",
        body: ReservationSchema.omit({ id: true }),
        responses: {
          201: ReservationSchema,
        },
      },
      edit: {
        method: "PUT",
        path: "/reservations/:id",
        body: ReservationSchema,
        responses: {
          200: ReservationSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/reservations/:id",
        body: z.object({}),
        responses: {
          200: ReservationSchema,
        },
      },
      cancel: {
        method: "POST",
        path: "/reservations/:id/cancel",
        body: z.object({}),
        responses: {
          200: ReservationSchema,
        },
      },
      findOne: {
        method: "GET",
        path: "/reservations/:id",
        responses: {
          200: ReservationSchema,
        },
      },
      findUserReservations: {
        method: "GET",
        path: "/reservations/user/:userId",
        responses: {
          200: z.array(ReservationSchema),
        },
      },
      findAll: {
        method: "GET",
        path: "/reservations",
        responses: {
          200: z.array(ReservationSchema),
        },
        query: ReservationParamsSchema,
      },
    },
    schedules: {
      create: {
        method: "POST",
        path: "/schedules",
        body: ScheduleSchemaPost,
        responses: {
          201: ScheduleSchema,
        },
      },
      edit: {
        method: "PUT",
        path: "/schedules/:id",
        body: ScheduleSchema.omit({ id: true }),
        responses: {
          200: ScheduleSchema,
        },
      },
      generateEvents: {
        method: "POST",
        path: "/schedules/:id/generate",
        body: z.object({
          date: z.string().datetime(),
        }),
        responses: {
          201: z.array(EventSchema),
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
