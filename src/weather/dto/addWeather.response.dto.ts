import { ApiProperty } from '@nestjs/swagger';

export class AddWeatherResponseDto {
  @ApiProperty()
  country: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  temperature: number;
  @ApiProperty()
  weather: string;
}
