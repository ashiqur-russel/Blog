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
exports.AdminServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = require("../blog/blog.model");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default('User not found', http_status_1.default.NOT_FOUND);
    }
    if (user.isBlocked) {
        throw new AppError_1.default('User is already blocked', http_status_1.default.BAD_REQUEST);
    }
    yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true, runValidators: true });
});
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById({ _id: blogId });
    if (!blog) {
        throw new AppError_1.default('Blog not found', http_status_1.default.NOT_FOUND);
    }
    yield blog_model_1.Blog.findByIdAndDelete({ _id: blogId });
});
exports.AdminServices = {
    blockUser,
    deleteBlog,
};
