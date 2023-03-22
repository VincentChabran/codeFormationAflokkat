import * as dotenv from "dotenv";
dotenv.config();
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
// import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: MysqlConnectionOptions = {
   type: "mysql",
   host: process.env.DATABASE_HOST,
   port: 3306,
   username: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
   entities: ["dist/**/entities/*.entity{.ts,.js}"],
   synchronize: false,
   migrations: ["dist/src/mysqldb/migrations/*.js"],
   cli: {
      migrationsDir: "src/mysqldb/migrations",
   },
};

// const config: SqliteConnectionOptions = {
//   type: "sqlite",
//   database: "db",
//   entities: ["dist/**/entities/*.entity{.ts,.js}"],
//   synchronize: false,
//   migrations: ["dist/src/sqlitedb/migrations/*.js"],
//   cli: {
//     migrationsDir: "src/sqlitedb/migrations",
//   },
// };

export default config;
