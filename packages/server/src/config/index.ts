import { getEnvPath } from 'src/common/helper/env.helper';
import { config } from 'dotenv';
import { resolve } from 'path';

const envFilePath: string = getEnvPath(resolve(__dirname, '..', 'common/envs'));

config({ path: envFilePath });

const connectionString = 'mysql://root:@localhost:3306/ecommerce';


export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  database: {
    url: connectionString,
    entities: process.env.DATABASE_ENTITIES || 'dist/**/*.entity.{ts,js}',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  adminUser: {
    email: process.env.ADMIN_EMAIL || 'admin@admin.com',
    password: process.env.ADMIN_PASSWORD || '12345678',
  },
});