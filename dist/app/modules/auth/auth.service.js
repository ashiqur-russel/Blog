"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.default('User Not exist with the email id !', 404);
    }
    if (yield user_model_1.User.isPasswordMatched(password, user.password)) {
        const JwtPayload = {
            email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(JwtPayload, config_1.default.jwt_access_secret, {
            expiresIn: config_1.default.jwt_access_secret_expires,
        });
        return { token };
    }
    else {
        throw new AppError_1.default('Invalid credentials', 401);
    }
});
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.create(payload);
});
exports.AuthServices = {
    loginUser,
    registerUser,
};
