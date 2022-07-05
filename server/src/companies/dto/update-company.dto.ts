import {  IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'McDonalds' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'restaurant' })
  readonly serviceOfActivity: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '500' })
  readonly numberOfEmployees: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'sell fast food' })
  readonly description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'fast food restaurant ' })
  readonly type: string;
}
