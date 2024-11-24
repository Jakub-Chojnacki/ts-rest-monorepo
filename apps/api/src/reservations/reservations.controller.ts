import { Controller, UseGuards } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';

import { contract } from 'api-contract';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReservationsService } from './reservations.service';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.reservations)
  async handler() {
    return tsRestHandler(contract.reservations, {
      create: async ({ body }) => {
        const newReservation = await this.reservationsService.create(body);

        return {
          status: 201,
          body: newReservation,
        };
      },
      edit: async ({ params: { id }, body }) => {
        const editedReservation = await this.reservationsService.edit(id, body);

        return {
          status: 200,
          body: editedReservation,
        };
      },
      delete: async ({ params: { id } }) => {
        const deletedReservation = await this.reservationsService.delete(id);

        return {
          status: 200,
          body: deletedReservation,
        };
      },
      findOne: async ({ params: { id } }) => {
        const foundReservation = await this.reservationsService.findOne(id);

        return {
          status: 200,
          body: foundReservation,
        };
      },
      findAll: async ({ query: { isCancelled } }) => {
        const reservations =
          await this.reservationsService.findAll(isCancelled);

        return {
          status: 200,
          body: reservations,
        };
      },
    });
  }
}
