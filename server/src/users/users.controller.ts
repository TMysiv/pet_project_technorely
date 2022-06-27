import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

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
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Receive information about one User' })
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
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update some fields of User' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: 'qwerty@gamil.com',
        password: '12345678',
        phone: '0974856321',
        lastName: 'Ivanenko',
        firstName: 'Ivan',
        nickName: 'vanya',
        description: 'worker',
        position: 'ceo',
        role: 'user',
      },
    },
  })
  @Put('/:id')
  updateUser(@Body() user: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(user, id);
  }

  @ApiOperation({ summary: 'Delete User' })
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
