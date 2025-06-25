import type { IconNames } from '@/types'

export function parseTopicSlug(name?: string | null): IconNames {
  return name.replace(' ', '-').toLowerCase() as IconNames
}
