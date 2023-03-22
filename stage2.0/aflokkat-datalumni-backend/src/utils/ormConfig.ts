import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
require('dotenv').config();

export const ormConfig: PostgresConnectionOptions = {
   type: 'postgres',
   host: process.env.DATABASE_HOST,
   port: parseInt(process.env.DATABASE_PORT),
   username: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
   entities: ['dist/**/entities/*.entity{.ts,.js}'],
   synchronize: true,
   // migrations: ['dist/src/mysqldb/migrations/*.js'],
};
