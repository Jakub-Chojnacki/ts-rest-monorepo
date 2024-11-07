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

  async findOne(username: string): Promise<User | undefined> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { username },
      });

      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }

      return user;
    } catch (error) {
      // Log the error if desired
      console.error(`Error finding user with username ${username}:`, error);

      // Throw a generic error to avoid leaking database details
      throw new InternalServerErrorException('Error retrieving user');
    }
  }
}
