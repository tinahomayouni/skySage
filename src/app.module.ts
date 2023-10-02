import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [DatabaseModule, WeatherModule],
})
export class AppModule {}
