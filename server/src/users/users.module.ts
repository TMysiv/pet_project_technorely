import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../core/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [JwtModule],
})
export class UsersModule {}
