import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
};

export default new DataSource(dataSourceOptions);
