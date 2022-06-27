import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import {UpdateCompanyDto} from "./dto/update-company.dto";

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  createCompany(@Body() companyDto: CreateCompanyDto) {
    return this.companiesService.createCompany(companyDto);
  }

  @Get('/:userId')
  getAllById(@Param('userId') userId: string) {
    return this.companiesService.getAllById(Number(userId));
  }

  @Get('/user/:companyId')
  getCompanyById(@Param('companyId') companyId: string) {
    return this.companiesService.getOneById(Number(companyId));
  }

  @Put('/user/:companyId')
  updateCompany(@Body()updateDto:UpdateCompanyDto, @Param('companyId') companyId: string) {
    return this.companiesService.updateCompanyById(Number(companyId),updateDto);
  }

  @Delete('/user/:companyId')
  deleteCompany(@Param('companyId') companyId: string) {
    return this.companiesService.deleteCompanyById(Number(companyId));
  }
}
