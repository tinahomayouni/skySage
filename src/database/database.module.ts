// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Weather } from 'src/entity/weather.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/sqlite.db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
  ],
})
export class DatabaseModule {}
