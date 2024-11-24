import z from 'zod';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { contract } from 'api-contract';

type TSchedule = z.infer<typeof contract.schedules.create.body>;

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async create(schedule: Omit<TSchedule, 'id'>) {
    try {
      const newSchedule = await this.prisma.schedule.create({
        data: {
          duration: schedule.duration,
          start: schedule.start,
          end: schedule.end,
          daysOfWeek: schedule.daysOfWeek,
          userId: schedule.userId,
        },
      });

      return newSchedule;
    } catch (error) {
      //TODO: Add error handling
    }
  }

  edit(scheduleId: string, schedule: Omit<TSchedule, 'id'>) {
    try {
      const updatedSchedule = this.prisma.schedule.update({
        where: { id: scheduleId },
        data: {
          duration: schedule.duration,
          start: schedule.start,
          end: schedule.end,
          daysOfWeek: schedule.daysOfWeek,
        },
      });

      return updatedSchedule;
    } catch (error) {
      //TODO: Add error handling
    }
  }
}
