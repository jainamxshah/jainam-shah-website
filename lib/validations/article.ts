import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  excerpt: z.string().min(10, 'At least 10 characters').max(200, 'Max 200 characters'),
  content: z.string().min(100, 'At least 100 characters'),
  category: z.string().min(1, 'Category is required'),
  readTime: z.string().min(1, 'Read time is required'),
  featuredImage: z.string().url().optional().or(z.string().length(0)),
  seoTitle: z.string().max(60, 'Max 60 characters'),
  seoDescription: z.string().max(160, 'Max 160 characters'),
  seoOgImage: z.string().url().optional().or(z.string().length(0)),
  published: z.boolean(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

