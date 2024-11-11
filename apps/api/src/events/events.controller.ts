import { Controller, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { contract } from 'api-contract';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.events)
  async handler() {
    return tsRestHandler(contract.events, {
      create: async ({ body }) => {
        const newEvent = await this.eventsService.create(body);

        return {
          status: 201,
          body: newEvent,
        };
      },
      delete: async ({ params: { id } }) => {
        const deletedEvent = await this.eventsService.delete(id);

        return {
          status: 200,
          body: deletedEvent,
        };
      },
      edit: async ({ params: { id }, body }) => {
        const editedEvent = await this.eventsService.edit(id, body);

        return {
          status: 200,
          body: editedEvent,
        };
      },
      getOne: async ({ params: { id } }) => {
        const foundEvent = await this.eventsService.getOne(id);

        return {
          status: 200,
          body: foundEvent,
        };
      },
      getMany: async ({ query: { start, end } }) => {
        const events = await this.eventsService.getMany(start, end);

        return {
          status: 200,
          body: events,
        };
      },
    });
  }
}
