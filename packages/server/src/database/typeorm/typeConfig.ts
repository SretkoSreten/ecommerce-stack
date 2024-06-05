import { config } from 'dotenv';
import { resolve } from 'path';
import { getEnvPath } from 'src/common/helper/env.helper';
import { DataSourceOptions } from 'typeorm';

const envFilePath: string = getEnvPath(
  resolve(__dirname, '../..', 'common/envs'),
);
config({ path: envFilePath });
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10),
  database: 'ecommerce',
  username: 'root',
  entities: ['dist/database/entities/**/*.entity.js'],
  migrations: ['dist/database/migration/history/*.js'],
  logger: 'simple-console',
  synchronize: true, // never use TRUE in production!
  logging: true, // for debugging in dev Area only
};