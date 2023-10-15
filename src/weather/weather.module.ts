import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { Weather } from 'src/entity/weather.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Weather])],
  controllers: [WeatherController],
  providers: [
    WeatherService,
    {
      provide: 'ALLOWED_ROLES',
      useValue: ['admin'], // Replace with your actual allowed roles
    },
  ],
})
export class WeatherModule {}
