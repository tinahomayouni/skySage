import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from 'src/entity/weather.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  async findAll(): Promise<Weather[]> {
    return this.weatherRepository.find();
  }

  // Implement other CRUD operations as needed
}
