import { ApiProperty } from '@nestjs/swagger';

export class WeatherResponseDto {
  @ApiProperty()
  temperature: number;

  @ApiProperty()
  weather: string;
}
