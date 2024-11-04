import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(event: Omit<Event, 'id'>) {
    const newEvent = this.prisma.event.create({
      data: event,
    });

    console.log(newEvent)
  }
}
