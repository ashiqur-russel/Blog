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
exports.BlogServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const blog_model_1 = require("./blog.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = query;
    const searchCriteria = {};
    const sortCriteria = [];
    if (search) {
        searchCriteria.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
        ];
    }
    if (filter) {
        searchCriteria.author = filter;
    }
    sortCriteria.push([sortBy, sortOrder === 'asc' ? 1 : -1]);
    const blogs = yield blog_model_1.Blog.find(searchCriteria)
        .sort(sortCriteria)
        .populate('author', { name: 1, email: 1 })
        .select('-isPublished -createdAt -updatedAt -__v');
    return blogs;
});
const createBlog = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    // this is not necessary to check as already AuthGuard is implemented on route level
    if (!token) {
        throw new AppError_1.default('Unauthorized!', http_status_1.default.UNAUTHORIZED);
    }
    try {
        const user = yield getUserDetails(token);
        if (!user) {
            throw new AppError_1.default('User not found', http_status_1.default.NOT_FOUND);
        }
        const newBlog = new blog_model_1.Blog(Object.assign(Object.assign({}, payload), { author: user === null || user === void 0 ? void 0 : user._id }));
        const blog = yield blog_model_1.Blog.create(newBlog);
        const populatedBlog = yield blog_model_1.Blog.findById(blog._id)
            .populate('author', 'name email')
            .select('-isPublished -createdAt -updatedAt -__v');
        return populatedBlog;
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        throw new AppError_1.default('Failed to create blog', http_status_1.default.BAD_REQUEST);
    }
});
const getUserDetails = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerToken = token.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(bearerToken, config_1.default.jwt_access_secret);
    const { email } = decoded;
    return yield user_model_1.User.getUserDetails(email);
});
const getBlogbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_model_1.Blog.findById({ _id: id });
        if (!blog) {
            throw new AppError_1.default('Blog not found', http_status_1.default.NOT_FOUND);
        }
        return blog;
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        throw new AppError_1.default('Failed to get Blog', http_status_1.default.INTERNAL_SERVER_ERROR);
    }
});
const deleteBlog = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield getUserDetails(token);
        if (!user) {
            throw new AppError_1.default('User not authenticated', http_status_1.default.UNAUTHORIZED);
        }
        const blog = yield blog_model_1.Blog.findById(id).populate('author', 'email');
        if (!blog) {
            throw new AppError_1.default('Blog not found', http_status_1.default.NOT_FOUND);
        }
        if (user.email !== ((_a = blog.author) === null || _a === void 0 ? void 0 : _a.email)) {
            throw new AppError_1.default('You are not authorized to delete this blog', http_status_1.default.UNAUTHORIZED);
        }
        yield blog_model_1.Blog.findByIdAndDelete(id);
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        throw new AppError_1.default('Failed to delete Blog', http_status_1.default.INTERNAL_SERVER_ERROR);
    }
});
const updateBlog = (id, updatedData, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield getUserDetails(token);
    if (!user) {
        throw new AppError_1.default('User not authenticated', http_status_1.default.UNAUTHORIZED);
    }
    const blog = yield blog_model_1.Blog.findById(id).populate('author', 'email');
    if (!blog) {
        throw new AppError_1.default('Blog not found', http_status_1.default.NOT_FOUND);
    }
    if (user.email !== ((_a = blog.author) === null || _a === void 0 ? void 0 : _a.email)) {
        throw new AppError_1.default('You are not authorized to update this blog', http_status_1.default.UNAUTHORIZED);
    }
    const updatedBlog = blog_model_1.Blog.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    })
        .populate('author', 'name email')
        .select('-isPublished -createdAt -updatedAt -__v');
    return updatedBlog;
});
exports.BlogServices = {
    createBlog,
    getAllBlogs,
    deleteBlog,
    updateBlog,
    getBlogbyId,
};
