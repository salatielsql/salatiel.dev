export const TOPICS = ['Git', 'React Native', 'Typescript', 'Node'] as const

export const ICON_NAMES = [
  'astro',
  'github',
  'linkedin',
  'devto',
  'brazil',
  'react',
  'react-native',
  'phone',
  'node',
] as const

export type IconNames = (typeof ICON_NAMES)[number]

export type FeaturedWork = {
  title: string
  description: string
  href: string
  icons: IconNames[]
}

declare global {
  namespace globalThis {
    var __LATEST_UPDATE__: string | undefined
    var __COMMIT_HASH__: string | undefined
  }
}
