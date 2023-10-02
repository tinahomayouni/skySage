import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from 'src/entity/weather.entity';
import { Repository } from 'typeorm';
import { WeatherRequestDto } from './dto/weather.request.dto';
import { WeatherResponseDto } from './dto/weather.response.dto';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  async findAll(): Promise<string[]> {
    const distinctCountries = await this.weatherRepository
      .createQueryBuilder()
      .select('DISTINCT country')
      .getRawMany();

    return distinctCountries.map((item) => item.country);
  }

  async findCitiesByCountry(country: string): Promise<string[]> {
    const distinctCities = await this.weatherRepository
      .createQueryBuilder()
      .select('DISTINCT city')
      .where('country = :country', { country }) // Filter by the specified country
      .getRawMany();

    return distinctCities.map((item) => item.city);
  }
  async getWeatherForecast(
    request: WeatherRequestDto,
  ): Promise<WeatherResponseDto[]> {
    const { country, city } = request;

    // Query the database for weather data based on country and city
    const weatherData = await this.weatherRepository.findOne({
      where: { country, city },
    });

    // Check if data is found and return it
    if (weatherData) {
      return [
        {
          weather: weatherData.weather,
          flag: weatherData.flag,
        },
      ];
    }

    // If data is not found, return an empty array
    return [];
  }
}
