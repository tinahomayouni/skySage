import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherRequestDto } from './dto/weather.request.dto';
import { WeatherResultDto } from './dto/weather.response.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @Get('countries')
  @ApiOperation({ summary: 'Get a list of countries' })
  async findAll(): Promise<string[]> {
    return this.weatherService.findAll();
  }

  @Get('/:country/cities')
  @ApiOperation({ summary: 'Get a list of cities of countries' })
  async findCitiesByCountry(
    @Param('country') country: string,
  ): Promise<string[]> {
    return this.weatherService.findCitiesByCountry(country);
  }

  @Post('weather-forecaster')
  @ApiOperation({ summary: 'Get weather and flag' })
  async getWeatherForecast(
    @Body() request: WeatherRequestDto,
  ): Promise<WeatherResultDto[]> {
    const weatherResults =
      await this.weatherService.getWeatherForecast(request);
    return weatherResults;
  }
}
