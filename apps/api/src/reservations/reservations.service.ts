import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { contract } from 'api-contract';
import { Prisma } from '@prisma/client';
import * as z from 'zod';

import { PrismaService } from 'src/prisma.service';

type TReservation = z.infer<typeof contract.reservations.create.body>;

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}
  async create(reservation: Omit<TReservation, 'id'>) {
    try {
      const validatedReservation =
        contract.reservations.create.body.parse(reservation);

      const newReservation = await this.prisma.reservation.create({
        data: validatedReservation,
      });

      return newReservation;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException('Invalid reservation data provided');
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'A reservation with the same unique field already exists',
          );
        }
      }

      throw new InternalServerErrorException('Failed to create reservation');
    }
  }

  findAll(isCancelled: boolean = false) {
    try {
      const reservations = this.prisma.reservation.findMany({
        include: {
          user: true,
          event: true,
        },
        where: {
          isCancelled: isCancelled,
        },
      });

      return reservations;
    } catch {
      throw new InternalServerErrorException('Failed to find reservations');
    }
  }

  findOne(id: string) {
    try {
      const foundReservation = this.prisma.reservation.findUnique({
        where: {
          id,
        },
      });

      return foundReservation;
    } catch {
      throw new InternalServerErrorException('Failed to find reservation');
    }
  }

  edit(id: string, reservation: TReservation) {
    try {
      const editedReservation = this.prisma.reservation.update({
        where: {
          userId: reservation.userId,
          id,
        },
        data: {
          isCancelled: reservation.isCancelled,
          userId: reservation.userId,
        },
      });

      return editedReservation;
    } catch {
      throw new InternalServerErrorException('Failed to edit reservation');
    }
  }

  delete(id: string) {
    try {
      const deletedReservation = this.prisma.reservation.delete({
        where: {
          id,
        },
      });

      return deletedReservation;
    } catch {
      throw new InternalServerErrorException('Failed to delete reservation');
    }
  }
}
