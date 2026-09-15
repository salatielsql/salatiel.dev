// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import { rehypeBracketLinks } from './src/lib/markdown/rehype-bracket-links.ts'
import { rehypeGutterMarks } from './src/lib/markdown/rehype-gutter-marks.ts'

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  fonts: [
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.fontsource(),
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
    {
      name: 'Instrument Sans',
      cssVariable: '--font-instrument-sans',
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  markdown: {
    shikiConfig: { theme: 'one-light' },
    syntaxHighlight: { type: 'shiki', excludeLangs: ['math', 'agent-context'] },
    processor: unified({
      rehypePlugins: [rehypeGutterMarks, rehypeBracketLinks],
    }),
  },
})
