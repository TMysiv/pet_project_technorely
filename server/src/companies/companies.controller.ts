import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { JwtAuthGuards } from '../auth/guards';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Companies')
@UseGuards(JwtAuthGuards)
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @ApiOperation({ summary: 'Create new Company' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'KFC',
        address: 'Lviv region,city Lviv',
        serviceOfActivity: 'restaurant',
        numberOfEmployees: 150,
        description: 'sell fast food',
        type: 'fast food restaurant',
        userId: 2,
      },
    },
  })
  @Post('/:userId')
  createCompany(
    @Body() companyDto: CreateCompanyDto,
    @Param('userId') userId: string,
  ) {
    return this.companiesService.createCompany(companyDto, Number(userId));
  }

  @ApiOperation({ summary: 'Get All Companies by User' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'KFC',
        address: 'Lviv region,city Lviv',
        serviceOfActivity: 'restaurant',
        numberOfEmployees: "150",
        description: 'sell fast food',
        type: 'fast food restaurant',
        userId: 2,
      },
    },
  })
  @Get('/:userId/all')
  getAllById(@Param('userId') userId: string) {
    return this.companiesService.getAllById(Number(userId));
  }

  @ApiOperation({ summary: 'Get One Company by User' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'KFC',
        address: 'Lviv region,city Lviv',
        serviceOfActivity: 'restaurant',
        numberOfEmployees: 150,
        description: 'sell fast food',
        type: 'fast food restaurant',
        userId: 2,
      },
    },
  })
  @Get('/:userId/:companyId')
  getCompanyById(
    @Param('companyId') companyId: string,
    @Param('userId') userId: string,
  ) {
    return this.companiesService.getOneById(Number(companyId));
  }

  @ApiOperation({ summary: 'Update Company by id' })
  @Put('/:companyId')
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'McDonalds',
        address: 'Lviv region,city Lviv',
        serviceOfActivity: 'restaurant',
        numberOfEmployees: '500',
        description: 'sell fast food',
        type: 'fast food restaurant',
        userId: 2,
      },
    },
  })
  updateCompany(
    @Body() updateDto: UpdateCompanyDto,
    @Param('companyId') companyId: string,
  ) {
    return this.companiesService.updateCompanyById(
      Number(companyId),
      updateDto,
    );
  }

  @ApiOperation({ summary: 'Delete Company' })
  @Delete('/:userId/:companyId')
  deleteCompany(
    @Param('companyId') companyId: string,
    @Param('userId') userId: string,
  ) {
    return this.companiesService.deleteCompanyById(Number(companyId));
  }
}
