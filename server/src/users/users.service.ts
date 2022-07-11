import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../core/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  async getUserByPhone(phone: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { phone } });
  }

  async getUserById(userId: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { id: Number(userId) } });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async updateUser(user: UpdateUserDto, id: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: {
        lastName: user.lastName,
        firstName: user.firstName,
        nickName: user.nickName,
        description: user.description,
        position: user.position,
      },
    });
  }

  async deleteUser(userId: string): Promise<string> {
    await this.prismaService.user.delete({ where: { id: Number(userId) } });
    return 'User successfully deleted';
  }
}
