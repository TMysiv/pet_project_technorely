import {Controller, Delete, Get, Param, UseGuards} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuards, RoleGuards } from '../auth/guards';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@UseGuards(JwtAuthGuards, RoleGuards)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @ApiOperation({ summary: 'Receive All Users' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: 'qwerty@gamil.com',
        password: '12345678',
        phone: '0978456159',
        lastName: 'Shevchenko',
        firstName: 'Taras',
        nickName: 'wolf',
        description: 'worker',
        position: 'ceo',
        role: 'user',
      },
    },
  })
  @Get('/allUsers')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @ApiOperation({ summary: 'Receive All Companies' })
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
  @Get('/allCompanies')
  getAllCompanies() {
    return this.adminService.getAllCompanies();
  }

  @ApiOperation({ summary: 'Update Role' })
  @UseGuards(RoleGuards)
  @Get('/role/:userId')
  addRole(@Param('userId') userId: string) {
    return this.adminService.addRole(Number(userId));
  }

  @ApiOperation({ summary: 'Delete User' })
  @UseGuards(RoleGuards)
  @Delete('/user/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.adminService.deleteUser(Number(userId));
  }

  @ApiOperation({ summary: 'Delete Company' })
  @UseGuards(RoleGuards)
  @Delete('/company/:companyId')
  deleteCompany(@Param('companyId') companyId: string) {
    return this.adminService.deleteCompany(Number(companyId));
  }
}
