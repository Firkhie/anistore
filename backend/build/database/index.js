"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDatabaseConfig = void 0;
const PORT = Number(process.env.DB_PORT) || 5432;
const config = {
    development: {
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.DATABASE_HOST,
        dialect: "postgres",
        logging: console.log,
        port: PORT,
        pool: {
            max: 20,
            min: 5,
            acquire: 15000,
            idle: 10000
        }
    }
};
function generateDatabaseConfig(env) {
    return config[env];
}
exports.generateDatabaseConfig = generateDatabaseConfig;
//# sourceMappingURL=index.js.map