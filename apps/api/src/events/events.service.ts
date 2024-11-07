import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(event: Omit<Event, 'id'>) {
    const newEvent = await this.prisma.event.create({
      data: event,
    });

    return newEvent
  }
}
