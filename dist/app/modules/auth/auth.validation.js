"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required.' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Name is required' })
            .trim()
            .max(50, 'Name can not be more than 50 characters.'),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .trim()
            .email('Invalid email format')
            .max(50, 'Email can not be more than 50 characters.'),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be string',
        })
            .trim()
            .max(20, 'Password can not be more than 20 characters.')
            .min(4, 'Password can not be less than 4 characters.'),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    registerValidationSchema,
};
