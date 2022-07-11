import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, Length} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Ivanenko' })
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 12)
  @ApiProperty({ example: 'Ivan' })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'vanya' })
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
