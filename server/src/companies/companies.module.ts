import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from '../core/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CompaniesService, PrismaService],
  controllers: [CompaniesController],
  imports: [JwtModule],
})
export class CompaniesModule {}
