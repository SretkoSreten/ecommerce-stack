import { config } from 'dotenv';
import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'host.docker.internal',
  port: 3306,
  database: 'ecommerce',
  username: 'root',
  password: "",
  entities: [__dirname + "/../entities/**/*.entity{.ts,.js}"],
  migrations: ["../migration/history/*{.js,.ts}"],
  logger: 'simple-console',
  synchronize: true, // never use TRUE in production!
  dropSchema: true,
  logging: true, // for debugging in dev Area only
};