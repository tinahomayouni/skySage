import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Weather } from 'src/entity/weather.entity';
import { DataSource } from 'typeorm';

export const config = {
  type: 'sqlite',
  database: 'src/database/sqlite.db',
  entities: [Weather],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
} satisfies TypeOrmModuleOptions;

export const connectionSource = new DataSource(config);
