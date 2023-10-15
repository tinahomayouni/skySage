import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { WeatherModule } from './weather/weather.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, WeatherModule, AuthModule],
})
export class AppModule {}
