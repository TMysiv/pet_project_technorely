import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, LoginUserDto } from './dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create new user' })
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
  @Post('/signup')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Login in system ' })
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
  @Post('/signin')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Logout from system' })
  @ApiOkResponse({ description: 'Logout Successfully', status: 200 })
  @Get('/logout')
  logout() {
    return 'Logout Successfully';
  }
}
