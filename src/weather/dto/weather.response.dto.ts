import { ApiProperty } from '@nestjs/swagger';

export class WeatherResultDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  weather: number;

  @ApiProperty()
  flag: string | null;
}
