import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<User | undefined> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User not found`);
      }

      return user;
    } catch (error) {
      console.error(`Error finding user`, error);

      throw new InternalServerErrorException('Error retrieving user');
    }
  }
}
