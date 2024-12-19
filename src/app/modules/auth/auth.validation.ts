import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .max(50, 'Name can not be more than 50 characters.'),

    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email format')
      .max(50, 'Email can not be more than 50 characters.'),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .trim()
      .max(20, 'Password can not be more than 20 characters.')
      .min(4, 'Password can not be less than 4 characters.'),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
};
