"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const PORT = Number(process.env.DB_PORT) || 5432;
exports.pool = new pg_1.Pool({
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DATABASE_HOST,
    port: PORT,
    max: 100,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: parseInt(process.env.POSTGRES_TIMEOUT || "") || 2000
});
//# sourceMappingURL=pool.js.map