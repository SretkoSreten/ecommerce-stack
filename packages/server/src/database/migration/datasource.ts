import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../typeorm/typeConfig';

const datasource = new DataSource(dataSourceOptions);

export default datasource;