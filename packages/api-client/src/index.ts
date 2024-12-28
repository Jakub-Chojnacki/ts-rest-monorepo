import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EventSchema } from "./schemas/event";
import {
  LoginReturnSchema,
  LoginSchema,
  SignupReturnSchema,
  SignupReturnSchemaError,
  SignupSchema,
  UserAuthMeSchema,
} from "./schemas/auth";
import {
  ReservationParamsSchema,
  ReservationSchema,
  ReservationSchemaWithEvent,
  ReservationSchemaWithEventAndUser,
} from "./schemas/reservations";
import {
  DailyTimingSchema,
  ScheduleSchema,
  ScheduleSchemaPost,
} from "./schemas/schedules";
import { UnauthorizedSchema } from "./schemas/utils";

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
          200: z.array(ReservationSchemaWithEvent),
        },
      },
      findAll: {
        method: "GET",
        path: "/reservations",
        responses: {
          200: z.array(ReservationSchemaWithEventAndUser),
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
      findAll: {
        method: "GET",
        path: "/schedules/:userId/",
        responses: {
          200: ScheduleSchema,
        },
      },
      deleteTiming: {
        method: "DELETE",
        path: "/schedules/timings/:timingId",
        body:z.any(),
        responses: {
          200: DailyTimingSchema,
        },
      },
      editTiming: {
        method: "PUT",
        path: "/schedules/timings/:timingId",
        body: DailyTimingSchema.omit({ id: true }),
        responses: {
          200: DailyTimingSchema,
        },
      },
      createTiming: {
        method: "POST",
        path: "/schedules/:scheduleId/timings",
        body: DailyTimingSchema.omit({ id: true }),
        responses: {
          201: DailyTimingSchema,
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
        400: SignupReturnSchemaError,
      },
    },
    auth: {
      method: "GET",
      path: "/auth/me",
      responses: {
        200: UserAuthMeSchema,
        401: UnauthorizedSchema,
      },
    },
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
  }
);
