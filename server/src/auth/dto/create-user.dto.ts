import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'qwerty@gamil.com' })
  readonly email: string;

  @ApiProperty({ example: '12345678' })
  readonly password: string;

  @ApiProperty({ example: '0974856321' })
  readonly phone: string;

  @ApiProperty({ example: 'Shevchenko' })
  readonly lastName: string;

  @ApiProperty({ example: 'Taras' })
  readonly firstName: string;

  @ApiProperty({ example: 'wolf' })
  readonly nickName: string;

  @ApiProperty({ example: 'worker' })
  readonly description: string;

  @ApiProperty({ example: 'ceo' })
  readonly position: string;
}
