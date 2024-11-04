import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';
import { contract } from 'api-contract';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @TsRestHandler(contract.events)
  async handler() {
    return tsRestHandler(contract.events, {
      create: async ({ body }) => {
        return {
          status: 201,
          body: this.eventsService.create(body),
        };
      },
    });
  }
}
