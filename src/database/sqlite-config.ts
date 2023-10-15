import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Weather } from 'src/entity/weather.entity';
import { DataSource } from 'typeorm';

export const config = {
  type: 'sqlite',
  database: 'src/database/sqlite.db', // Use an absolute path
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
} satisfies TypeOrmModuleOptions;

export const connectionSource = new DataSource(config);
