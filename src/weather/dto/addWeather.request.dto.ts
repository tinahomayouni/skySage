import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

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
  @IsString()
  @ApiProperty()
  temperature: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  weather: string;
}
