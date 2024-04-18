"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = require("../database");
const path_1 = __importDefault(require("path"));
let sequelizeClient;
const initSequelize = async (env) => {
    if (!sequelizeClient) {
        sequelizeClient = await new sequelize_typescript_1.Sequelize({
            ...(0, database_1.generateDatabaseConfig)(env),
            models: [path_1.default.resolve(__dirname, "../models")]
        });
    }
    sequelizeClient.validate();
};
exports.initSequelize = initSequelize;
//# sourceMappingURL=sequelize.js.map