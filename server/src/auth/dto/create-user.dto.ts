import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsMobilePhone, IsNotEmpty, IsString, Length} from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'qwerty@gamil.com' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4,10)
  @ApiProperty({ example: '12345678' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  @Length(6)
  @ApiProperty({ example: '0974856321' })
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Shevchenko' })
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Taras' })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'wolf' })
  readonly nickName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'worker' })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'ceo' })
  readonly position: string;
}
