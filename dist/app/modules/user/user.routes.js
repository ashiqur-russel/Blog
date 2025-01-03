"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authGuard_1 = require("../../middlewares/authGuard");
const user_controller_1 = require("./user.controller");
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.get('/', (0, authGuard_1.AuthGuard)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.getAllUser);
exports.UserRoutes = router;
