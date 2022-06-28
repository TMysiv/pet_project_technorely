import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { PrismaService } from '../core/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@Injectable()
export class CompaniesService {
  constructor(private prismaService: PrismaService) {}

  async createCompany(
    companyDto: CreateCompanyDto,
    userId: number,
  ): Promise<Company> {
    const { name } = companyDto;

    const checkCompany = await this.prismaService.company.findFirst({
      where: { name },
    });

    if (checkCompany) {
      throw new HttpException(
        `Company with this name ${name} exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    Object.assign(companyDto, { userId });
    console.log(companyDto);
    return this.prismaService.company.create({ data: companyDto });
  }

  async getAllById(userId: number): Promise<Company[]> {
    return this.prismaService.company.findMany({ where: { userId } });
  }

  async getOneById(companyId: number): Promise<Company> {
    return this.prismaService.company.findFirst({ where: { id: companyId } });
  }

  async updateCompanyById(
    companyId: number,
    updateDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.prismaService.company.update({
      where: { id: companyId },
      data: {
        name: updateDto.name,
        serviceOfActivity: updateDto.serviceOfActivity,
        numberOfEmployees: updateDto.numberOfEmployees,
        description: updateDto.description,
        type: updateDto.type,
      },
    });
  }

  async deleteCompanyById(companyId: number) {
    return this.prismaService.company.delete({ where: { id: companyId } });
  }
}
