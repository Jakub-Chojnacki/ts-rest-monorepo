import z from 'zod';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { contract } from 'api-contract';

type TEvent = z.infer<typeof contract.events.create.body>;

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(event: Omit<TEvent, 'id'>) {
    const newEvent = await this.prisma.event.create({
      data: event,
    });

    return newEvent;
  }

  async delete(eventId: string) {
    const foundEvent = await this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!foundEvent)
      throw new NotFoundException(`Event with id ${eventId} was not found`);

    const deletedEvent = await this.prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return deletedEvent;
  }

  async edit(eventId: string, data: TEvent) {
    const foundEvent = await this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!foundEvent)
      throw new NotFoundException(`Event with id ${eventId} was not found`);

    const { isBooked, end, start, title } = data;

    const editedEvent = await this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        isBooked,
        end,
        start,
        title,
      },
    });

    return editedEvent;
  }
  async getOne(eventId: string) {
    const foundEvent = await this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!foundEvent)
      throw new NotFoundException(`Event with id ${eventId} was not found`);

    return foundEvent;
  }

  async getMany(start?: string, end?: string) {
    try {
      const parsedStart = start ? new Date(start).toISOString() : undefined;
      const parsedEnd = end ? new Date(end).toISOString() : undefined;

      if (start && isNaN(Date.parse(start))) {
        throw new BadRequestException('Invalid start date format');
      }
      
      if (end && isNaN(Date.parse(end))) {
        throw new BadRequestException('Invalid end date format');
      }

      const events = await this.prisma.event.findMany({
        where: {
          ...(parsedStart && { start: { gte: parsedStart } }),
          ...(parsedEnd && { end: { lte: parsedEnd } }),
        },
      });

      return events;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to retrieve events');
    }
  }
}
