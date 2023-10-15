import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from 'src/entity/weather.entity';
import { Repository } from 'typeorm';
import { WeatherRequestDto } from './dto/weather.request.dto';
import { WeatherResponseDto } from './dto/weather.response.dto';
import { AddWeatherResponseDto } from './dto/addWeather.response.dto';

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
    /**
     * SELECT DISTINCT city FROM weather WHERE country = netherlands;
     */
    const distinctCities = await this.weatherRepository
      .createQueryBuilder()
      .select('DISTINCT city')
      .where('country = :country', { country }) // Filter by the specified country
      .getRawMany();

    return distinctCities.map((item) => item.city);
  }
  async getWeatherForecast(
    request: WeatherRequestDto,
  ): Promise<WeatherResponseDto | null> {
    const { country, city } = request;

    // Query the database for weather data based on country and city
    const weatherData = await this.weatherRepository.findOne({
      where: { country, city },
    });

    // Check if data is found and return it
    if (weatherData) {
      return {
        temperature: weatherData.temperature,
        weather: weatherData.weather,
      };
    }

    // If data is not found, return an empty array
    return null;
  }
  async saveWeatherForecast(
    request: AddWeatherResponseDto,
  ): Promise<AddWeatherResponseDto> {
    const { country, city, temperature, weather } = request;

    // Create a new Weather entity with the provided data
    const weatherData = new Weather();
    weatherData.country = country;
    weatherData.city = city;
    weatherData.temperature = temperature;
    weatherData.weather = weather;

    try {
      // Save the weather data to the database
      const savedWeatherData = await this.weatherRepository.save(weatherData);

      // Return the saved data as a WeatherResponseDto
      return {
        country: savedWeatherData.country,
        city: savedWeatherData.city,
        temperature: savedWeatherData.temperature,
        weather: savedWeatherData.weather,
      };
    } catch (error) {
      // Handle errors, e.g., database constraint violations, and return appropriate responses
      throw new Error('Failed to save weather data');
    }
  }
}
