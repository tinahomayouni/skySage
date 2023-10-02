import { ApiProperty } from '@nestjs/swagger';

export class WeatherResponseDto {
  @ApiProperty()
  weather: number;

  @ApiProperty()
  flag: string | null;
}
