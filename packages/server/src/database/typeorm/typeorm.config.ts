import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: 'host.docker.internal',
  port: 3306,
  database: 'ecommerce',
  username: 'root',
  password: "",
  entities: [join(__dirname, '/../entities/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '/../migration/history/*{.ts,.js}')],
  logger: 'simple-console',
  synchronize: false, // never use TRUE in production!
  logging: true, // for debugging in dev Area only
}); 