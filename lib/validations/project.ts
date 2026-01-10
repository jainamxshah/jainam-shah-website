import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  shortDescription: z.string().min(10, 'At least 10 characters').max(200, 'Max 200 characters'),
  outcomeMetric: z.string().min(1, 'Outcome metric is required'),
  thumbnailUrl: z.string().url('Must be a valid URL').or(z.string().length(0)),
  heroImageUrl: z.string().url('Must be a valid URL').or(z.string().length(0)),
  impactSummary: z.string().min(10, 'At least 10 characters'),
  year: z.string().regex(/^\d{4}$/, 'Must be a 4-digit year'),
  role: z.string().min(1, 'Role is required'),
  tags: z.array(z.string()),
  techStack: z.array(z.string()),
  context: z.object({
    title: z.string().min(1, 'Title is required'),
    body: z.string().min(1, 'Content is required'),
  }),
  approach: z.object({
    title: z.string().min(1, 'Title is required'),
    body: z.string().min(1, 'Content is required'),
    callout: z.string().optional(),
  }),
  execution: z.object({
    title: z.string().min(1, 'Title is required'),
    body: z.string().min(1, 'Content is required'),
    images: z
      .array(
        z.object({
          url: z.string().url(),
          caption: z.string(),
        })
      )
      .optional(),
  }),
  outcome: z.object({
    title: z.string().min(1, 'Title is required'),
    metrics: z.array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      })
    ),
    summary: z.string().min(1, 'Summary is required'),
  }),
  seoTitle: z.string().max(60, 'Max 60 characters'),
  seoDescription: z.string().max(160, 'Max 160 characters'),
  seoOgImage: z.string().url().optional().or(z.string().length(0)),
  published: z.boolean(),
  nextProjectSlug: z.string().optional().or(z.string().length(0)),
  prevProjectSlug: z.string().optional().or(z.string().length(0)),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

