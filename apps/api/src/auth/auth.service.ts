import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
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
    try {
      const user = await this.usersService.findOne(username);

      const passwordMatches = await this.comparePassword(
        password,
        user.password,
      );

      if (passwordMatches) {
        const { password, username, ...result } = user;
        return result;
      }

      throw new UnauthorizedException('Invalid credentials!');
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw e; // Re-throw findOne error
      }
      throw new UnauthorizedException(e.message);
    }
  }

  async login(user: User) {
    try {
      const payload = { username: user.username, sub: user.id };

      return {
        access_token: this.jwtService.sign(payload),
        userId: user.id,
      };
    } catch (e) {
      throw new InternalServerErrorException('Error generating access token!');
    }
  }

  async getUserFromToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findOne(decoded.username);

      return {
        userId: user.id,
        username: user.username,
        role: user.role,
      };
      
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async signup({
    email,
    password,
    username,
  }: Pick<User, 'password' | 'username' | 'email'>) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password, //it should be hashed before invoking signup()
          username,
        },
      });

      const payload = { username: newUser.username, sub: newUser.id };
      const token = this.jwtService.sign(payload);

      return {
        ...newUser,
        access_token: token,
      };
    } catch (e) {
      if (e.code === 'P2002') {
        // Prisma error code for unique constraint violation
        throw new BadRequestException(
          'User with this email or username already exists',
        );
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
