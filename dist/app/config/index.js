"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_secret_expires: process.env.JWT_ACCESS_EXPIRATION,
    jwt_refresh_secret_expires: process.env.JWT_REFRESH_EXPIRATION,
    environment: process.env.NODE_ENV,
    bcrypt_salt_rounds: process.env.SALT,
    default_pass: process.env.DEFAULT_PASS,
};
