import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddWeatherRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  temperature: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  weather: string;
}
