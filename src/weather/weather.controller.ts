import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherRequestDto } from './dto/weather.request.dto';
import { ApiOperation } from '@nestjs/swagger';
import { query } from 'express';
import { WeatherResponseDto } from './dto/weather.response.dto';

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
    @Query() query: WeatherRequestDto,
  ): Promise<WeatherResponseDto> {
    const { city, country } = query;

    // Check for missing city or country
    if (!city || !country) {
      throw new BadRequestException('Invalid data');
    }

    // Retrieve weather data from the service
    const weatherResults = await this.weatherService.getWeatherForecast(query);

    // Check if weather data is empty and handle the error
    if (!weatherResults) {
      throw new NotFoundException('Weather data not found');
    }

    return weatherResults;
  }
}
