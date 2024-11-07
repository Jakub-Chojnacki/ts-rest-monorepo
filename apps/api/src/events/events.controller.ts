import { Controller, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { contract } from 'api-contract';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('events')
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
    });
  }
}
