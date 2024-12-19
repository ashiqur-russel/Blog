"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const moduleRoutes = [{
        path: '/users',
        route: '',
    }];
moduleRoutes.forEach((route) => router.use(route.path));
exports.default = router;