"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const config = {
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
exports.default = config;
//# sourceMappingURL=ormconfig.js.map