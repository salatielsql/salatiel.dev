import type { IconNames } from '@/types'

type FooterNav = {
  label: string
  href: string
  icon?: IconNames | null
  external?: boolean
}

type FooterConfig = {
  title: string
  nav: FooterNav[]
}

export default [
  {
    title: 'Writing',
    nav: [
      {
        label: 'Typescript',
        href: '/typescript',
        external: false,
        icon: null,
      },
      {
        label: 'Typescript',
        href: '/typescript',
        external: false,
        icon: null,
      },
      {
        label: 'Typescript',
        href: '/typescript',
        external: false,
        icon: null,
      },
    ],
  },

  {
    title: 'Projects',
    nav: [
      {
        label: 'JSON view parser',
        href: 'https://json.sltl.app',
        external: true,
        icon: null,
      },
      {
        label: 'Directional Navigation',
        href: 'https://github.com/salatielsql/directional-navigation',
        external: true,
        icon: null,
      },
    ],
  },
  {
    title: 'About me',
    nav: [
      {
        label: 'How I got here',
        href: '/about',
        external: false,
        icon: null,
      },
      {
        label: 'Resume',
        href: '/resume',
        external: false,
        icon: null,
      },
      {
        label: 'Uses',
        href: '/uses',
        external: false,
        icon: null,
      },
    ],
  },
  {
    title: 'Social',
    nav: [
      {
        label: 'GitHub',
        href: 'https://github.com/salatielsql',
        icon: 'github',
        external: true,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/salatiel-queiroz/',
        icon: 'linkedin',
        external: true,
      },
      {
        label: 'Dev.to',
        href: 'https://dev.to/salatielsql',
        icon: 'devto',
        external: true,
      },
    ],
  },
] satisfies FooterConfig[]
