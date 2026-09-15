## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Other useful commands:

- `pnpm run check-code-quality`: Run all linters/checks validation at once (Preferred)
- `pnpm run lint`: oxlint validation
- `pnpm run lint:fix`: oxlint fix lint issues
- `pnpm run check`: astro check validation
- `pnpm run typecheck`: Typescript validation

## Code Conventions

These apply project-wide, not just to `.astro` files.

### CSS

- Name classes with BEM (`block__element--modifier`) instead of bare descendant selectors.
- Use native CSS nesting (`&`) for child selectors and pseudo-classes.
- Use CSS custom properties for design tokens (colors, fonts, spacing) instead of hardcoded values, once a shared stylesheet defines them.

### TypeScript

- Do not use `any` as typing - that's unacceptable
- Prefer `type` to construct types

### Imports

Use the `@/` alias (configured in `tsconfig.json`, mapped to `./src/*`) instead of relative imports across directories, e.g. `import Foo from '@/components/Foo.astro'`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

<!-- fallow:agent-install v1 claude-import:start -->

@AGENTS.md
<!-- fallow:agent-install v1 claude-import:end -->
