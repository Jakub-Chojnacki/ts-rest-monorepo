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
    });
  }
}
