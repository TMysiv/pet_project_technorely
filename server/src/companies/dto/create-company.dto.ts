import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'KFC' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Lviv region,city Lviv' })
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'restaurant' })
  readonly serviceOfActivity: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '150' })
  readonly numberOfEmployees: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'sell fast food' })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'fast food restaurant' })
  readonly type: string;
}
