"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const ts_dotenv_1 = require("ts-dotenv");
const env = (0, ts_dotenv_1.load)({
    ENVIRONMENT: String,
    MONGO_DB_LOCAL_URI: String,
    MONGO_DB_PRODUCTION_URI: String,
});
const environment = () => {
    return env.ENVIRONMENT === 'development'
        ? {
            MONGO_DB_URI: env.MONGO_DB_LOCAL_URI,
        }
        : {
            MONGO_DB_URI: env.MONGO_DB_PRODUCTION_URI,
        };
};
exports.environment = environment;
