import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Ivanenko' })
  readonly lastName: string;

  @IsString()
  @IsOptional()
  @Length(3, 12)
  @ApiProperty({ example: 'Ivan' })
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'vanya' })
  readonly nickName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'worker' })
  readonly description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'ceo' })
  readonly position: string;
}
