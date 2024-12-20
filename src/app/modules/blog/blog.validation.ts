import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .max(200, 'Title cannot be more than 200 characters long'),
    content: z.string({ required_error: 'Content is required' }),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .max(200, 'Title cannot be more than 200 characters long')
      .optional(),
    content: z.string({ required_error: 'Content is required' }).optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
