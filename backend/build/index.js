"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("./database/sequelize");
const routers_1 = require("./routers");
const env = process.env.NODE_ENV || "development";
if (env === "development" || env === "test") {
    dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
}
(async function () {
    try {
        await (0, sequelize_1.initSequelize)(env);
        const app = (0, express_1.default)();
        app.use(routers_1.user);
        app.listen(process.env.BACKEND_SERVER_PORT, () => {
            if (env === "development") {
                console.log(`server ready at http://localhost:${process.env.BACKEND_SERVER_PORT}`);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=index.js.map