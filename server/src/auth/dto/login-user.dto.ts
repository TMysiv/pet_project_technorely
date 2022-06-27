import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'qwerty@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  @ApiProperty({ example: '12345678' })
  password: string;
}
