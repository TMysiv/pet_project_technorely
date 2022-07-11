import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../core/prisma.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret_key_jwt',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
})
export class AuthModule {}
