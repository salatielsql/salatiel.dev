import { glob } from 'astro/loaders'
import { defineCollection, reference, z } from 'astro:content'

import { ICON_NAMES, TOPICS } from '@/types'

const topics = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.enum(TOPICS),
    icon: z.enum(ICON_NAMES),
  }),
})

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),

  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Transform string to Date object
      date: z.coerce.date(),
      slug: z.string(),
      topics: z.array(reference('topics')),
      updatedAt: z.coerce.date().optional(),
    }),
})

export const collections = { blog, topics }
