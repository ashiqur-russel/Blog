"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const authGuard_1 = require("../../middlewares/authGuard");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.get('/blogs', blog_controller_1.BlogControllers.getAllBlogs);
router.post('/create-blog', (0, authGuard_1.AuthGuard)('user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.delete('/:id', (0, authGuard_1.AuthGuard)('user'), blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRoutes = router;
