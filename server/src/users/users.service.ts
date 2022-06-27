import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../core/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  getUserById(id: number): Promise<User> {
    return this.prismaService.user.findFirst({ where: { id } });
  }
}
