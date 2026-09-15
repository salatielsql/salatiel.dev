import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: baseSchema.extend({
    updatedAt: z.coerce.date().optional(),
  }),
})

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experiments' }),
  schema: baseSchema.extend({
    repo: z.url().optional(),
    demo: z.url().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: baseSchema.extend({
    repo: z.url().optional(),
    url: z.url().optional(),
    featured: z.boolean().default(false),
    archived: z.boolean().default(false),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    frontmatterRows: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          href: z.url().optional(),
        })
      )
      .default([]),
  }),
})

export const collections = { blog, experiments, projects, pages }
