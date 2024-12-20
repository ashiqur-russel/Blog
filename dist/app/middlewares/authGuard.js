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
exports.AuthGuard = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const AuthGuard = (...userRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new AppError_1.default('Unauthorized', 401);
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { email, role } = decoded;
        const user = yield user_model_1.User.isUserExistsByEmail(email);
        if (!user) {
            throw new AppError_1.default('This user is not found !', http_status_1.default.NOT_FOUND);
        }
        if (user.isBlocked) {
            throw new AppError_1.default('This user is blocked ! !', http_status_1.default.FORBIDDEN);
        }
        if (!userRole.includes(role)) {
            throw new AppError_1.default('Forbidden', 403);
        }
        next();
    }));
};
exports.AuthGuard = AuthGuard;
