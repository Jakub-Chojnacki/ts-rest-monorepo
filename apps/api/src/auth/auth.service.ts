import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password' | 'username'> | null> {
    const user = await this.usersService.findOne(username);

    const passwordMatches = await this.comparePassword(password, user.password);

    if (user && passwordMatches) {
      const { password, username, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async signup({ email, password, username }: Omit<User, 'id'>) {
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });

    return newUser;
  }
}
