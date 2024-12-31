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
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/', blog_controller_1.BlogControllers.getAllBlogs);
router.post('/', (0, authGuard_1.AuthGuard)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.get('/:id', blog_controller_1.BlogControllers.getBlogById);
router.patch('/:id', (0, authGuard_1.AuthGuard)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogValidationSchema), blog_controller_1.BlogControllers.updateBlog);
router.delete('/:id', (0, authGuard_1.AuthGuard)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRoutes = router;
