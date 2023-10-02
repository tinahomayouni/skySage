// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from 'src/entity/weather.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/sqlite.db',
      entities: [Weather],
    }),
  ],
})
export class DatabaseModule {}
