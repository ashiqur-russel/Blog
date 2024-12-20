"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z
            .string({ required_error: 'Title is required' })
            .max(200, 'Title cannot be more than 200 characters long'),
        content: zod_1.z.string({ required_error: 'Content is required' }),
    })
        .strict(),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({ required_error: 'Title is required' })
            .max(200, 'Title cannot be more than 200 characters long')
            .optional(),
        content: zod_1.z.string({ required_error: 'Content is required' }).optional(),
    }),
});
exports.BlogValidation = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
