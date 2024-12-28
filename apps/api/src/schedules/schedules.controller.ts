import { Controller, UseGuards } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';

import { contract } from 'api-contract';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { SchedulesService } from './schedules.service';

@Controller()
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.schedules)
  async handler() {
    return tsRestHandler(contract.schedules, {
      findAll: async ({ params: { userId } }) => {
        const schedule = await this.schedulesService.getUserSchedule(userId);

        return {
          status: 200,
          body: schedule,
        };
      },
      create: async ({ body }) => {
        const newSchedule = await this.schedulesService.create(body);

        return {
          status: 201,
          body: newSchedule,
        };
      },
      edit: async ({ params: { id }, body }) => {
        const editedSchedule = await this.schedulesService.edit(id, body);

        return {
          status: 200,
          body: editedSchedule,
        };
      },
      generateEvents: async ({ params: { id }, body: { date } }) => {
        const events = await this.schedulesService.generateEventsForSingleDay(
          id,
          new Date(date),
        );

        return {
          status: 201,
          body: events,
        };
      },
    });
  }
}
