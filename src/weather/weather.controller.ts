import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  HttpCode,
  BadRequestException,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherRequestDto } from './dto/weather.request.dto';
import { WeatherResponseDto } from './dto/weather.response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common'; // Import UseGuards
import { AddWeatherRequestDto } from './dto/addWeather.request.dto';
import { AddWeatherResponseDto } from './dto/addWeather.response.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
  @HttpCode(200)
  @ApiResponse({ description: 'Get weather and flag' })
  @ApiResponse({ status: 404, description: 'Failed to find country' })
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

  @Post('add-weather-forecast')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Add and save weather data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' }) // Unauthorized response
  @ApiBearerAuth() // Indicate the need for JWT authentication
  @ApiResponse({ description: 'Add and save weather data' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'Failed to save weather data' })
  async addWeatherForecast(
    @Body() query: AddWeatherRequestDto,
  ): Promise<AddWeatherResponseDto> {
    // Save weather data to the service
    const savedWeatherData =
      await this.weatherService.saveWeatherForecast(query);

    // Check if saving was successful and handle the error if necessary
    if (!savedWeatherData) {
      throw new NotFoundException('Failed to save weather data');
    }

    return savedWeatherData;
  }
}
