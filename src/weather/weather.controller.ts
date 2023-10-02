import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Weather } from 'src/entity/weather.entity';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('weather')
  async findAll(): Promise<Weather[]> {
    return this.weatherService.findAll();
  }

  // Implement other API endpoints as needed
}
