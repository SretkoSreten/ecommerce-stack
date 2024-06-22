import { DataSource } from 'typeorm';
import { join } from 'path';

const datasource = new DataSource({
    type: 'mysql',
    host: 'host.docker.internal',
    port: 3306,
    database: 'ecommerce',
    username: 'root',
    password: "",
    entities: [join(__dirname, '/../entities/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, 'history/*{.ts,.js}')],
    logger: 'simple-console',
    synchronize: false, // never use TRUE in production!
    logging: true, // for debugging in dev Area only
});

export default datasource;