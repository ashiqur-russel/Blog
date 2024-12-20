"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const authGuard_1 = require("../../middlewares/authGuard");
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
// Route to block a user
router.patch('/users/:userId/block', (0, authGuard_1.AuthGuard)('admin'), admin_controller_1.AdminControllers.blockUser);
// Route to delete a blog
router.delete('/blogs/:id');
exports.AdminRoutes = router;
