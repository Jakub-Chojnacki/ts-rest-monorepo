import z from 'zod';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { contract } from 'api-contract';

type TSchedule = z.infer<typeof contract.schedules.create.body>;
@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}
  async create(schedule: Omit<TSchedule, 'id'>) {
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        const newSchedule = await prisma.schedule.create({
          data: {
            eventDuration: schedule.eventDuration,
            userId: schedule.userId,
          },
        });

        const dailyTimings = [
          {
            dayOfWeek: 'MONDAY',
            start: new Date('2023-01-01T09:00:00'),
            end: new Date('2023-01-01T10:00:00'),
            scheduleId: newSchedule.id,
          },
          {
            dayOfWeek: 'TUESDAY',
            start: new Date('2023-01-01T08:00:00'),
            end: new Date('2023-01-01T16:30:00'),
            scheduleId: newSchedule.id,
          },
        ];

        const createdDailyTimings =
          await prisma.dailyTiming.createManyAndReturn({
            data: dailyTimings as TSchedule['dailyTimings'],
          });

        const finalSchedule = await prisma.schedule.update({
          where: { id: newSchedule.id },
          data: { dailyTimings: { connect: createdDailyTimings } },
          include: { dailyTimings: true },
        });

        return finalSchedule;
      });

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException('Invalid schedule data provided');
      }

      throw new InternalServerErrorException('Failed to create schedule');
    }
  }

  async edit(scheduleId: string, schedule: Partial<Omit<TSchedule, 'id'>>) {
    try {
      const updatedSchedule = this.prisma.schedule.update({
        where: { id: scheduleId },
        data: {
          eventDuration: schedule?.eventDuration,
          userId: schedule?.userId,
          dailyTimings: schedule?.dailyTimings
            ? {
                upsert: schedule.dailyTimings.map((timing) => ({
                  where: { id: timing.id },
                  update: timing,
                  create: timing,
                })),
              }
            : undefined,
        },
        include: { dailyTimings: true },
      });

      return updatedSchedule;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException('Invalid schedule data provided');
      }

      throw new InternalServerErrorException('Failed to create schedule');
    }
  }
}
