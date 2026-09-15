---
paths:
  - 'src/**/*.astro'
---

# Astro Component Patterns

This rule defines the standard patterns and conventions for creating Astro components in this project

## Component Structure

All Astro components must follow this structure:

```astro
---
// 1. Imports (types, components, configs)
// 2. Props definition
// 3. Props destructuring
// 4. Any other logic related Typescript
---

<!-- 5. Component markup or html -->

<style>
  /* 6. Scoped styles */
</style>
```

## Props Definition

### TypeScript

Use TypeScript `type` for props

```astro
---
// Good: Simple props with type
type Props = {
  href: string
  title?: string
}

// Good: Extending HTML attributes
import type {HTMLAttributes} from 'astro/types'
type Props = HTMLAttributes<'a'>
---
```

### Props Destructuring

Always destructure props from `Astro.props` in the frontmatter:

```astro
---
type Props = {
  href: string
  class?: string
}

const { href, class: className } = Astro.props
---
```

**Note**: When using `class` as a prop name, destructure it as `className` to avoid conflicts with the `class` keyword.

## Conditional Rendering

Use conditional rendering with boolean expressions:

```astro
---
const { date, href } = Astro.props
---

{/* Good: Simple conditional */}
{Boolean(date) && (
  <time datetime={date.toISOString()}>
    {date.toLocaleDateString()}
  </time>
)}

{/* Good: Conditional wrapper */}
{href && (
  <a class="card" href={href}>
    <slot />
  </a>
)}
```

## Class Management

Use `class:list` for conditional classes:

```astro
---
const { class: className, isActive } = Astro.props
---

{/* Good: Using class:list */}
<a class:list={['navlink', className, {active: isActive}]}>
  <slot />
</a>

{/* Good: Combining classes */}
<time class:list={['formatted-date', className]} datetime={date.toISOString()}>
  {date.toLocaleDateString()}
</time>
```

## Slots

Use `<slot />` for component children:

```astro
---
type Props = {
  href: string
}

const { href } = Astro.props
---

{/* Good: Using slot for children */}
<a class="button-link" href={href}>
  <slot />
</a>
```

## Imports

Use the `@/` alias for imports instead of relative paths:

```astro
---
// Good: Using @/ alias
import Foo from '@/components/Foo.astro'

// Bad: Relative imports when alias available
import Foo from '../../components/Foo.astro'
---
```

## HTML markup

Use semantic elements (`<header>`, `<nav>`, `<time>`, etc.) instead of generic `<div>`/`<span>` where one fits.

## Styling Patterns

This project do not use Tailwind or tailwind-related patterns

### Scoped Styles

All component styles must be scoped using the `<style>` tag (scoped by default in Astro):

```astro
<style>
  .component-name {
    /* Styles are automatically scoped to this component */
  }
</style>
```

### CSS

- Name classes with BEM (`block__element--modifier`) instead of bare descendant selectors.
- Use native CSS nesting (`&`) for child selectors and pseudo-classes.
- Use CSS custom properties for design tokens (colors, fonts, spacing) instead of hardcoded values, once a shared stylesheet defines them.
- Use 200-250ms ease transitions for interactive elements.

## Design System (`src/ui`)

All design-system components live flat in `src/ui/*.astro` and use only the `--ds-*` tokens from `src/styles/tokens.css`. Full-page layouts (`<html>/<head>/<body>`) do not belong here — they go in `src/layouts` and compose `src/ui` components.

### CSS nesting is broken with `&__element` / `&--modifier`

Astro's scoped styles append a `[data-astro-cid-xxxx]` **attribute selector** to every class selector. Native CSS nesting resolves `&__element` / `&--modifier` by concatenating the suffix directly onto `&`, which after Astro's scoping becomes `[data-astro-cid-xxxx]__element` — a type selector following an attribute selector, which is invalid CSS. The browser silently drops the whole nested rule: no console error, no lint/typecheck/build failure — the component just renders unstyled.

```astro
<style>
  /* Bad — silently dropped under Astro's scoping */
  .nav-link {
    &__shortcut { ... }
    &--active { ... }
  }

  /* Good — full class name, valid under scoping */
  .nav-link {
    & .nav-link__shortcut { ... }  /* element: descendant (space), different element */
    &.nav-link--active { ... }     /* modifier: compound (no space), same element */
  }
</style>
```

Rule of thumb: `& .block__element` (space) for a class on a **different**/child element, `&.block--modifier` (no space) for a modifier class added alongside the base class on the **same** element (e.g. via `class:list`). Pseudo-classes (`&:hover`) are unaffected and nest normally.

This class of bug passes `astro check`, lint, typecheck, `astro build`, and even a raw HTML curl check — the invalid CSS is still valid HTML. Verify new or changed component styles actually apply with a real browser (e.g. `getComputedStyle` on the element, or a screenshot), not just static checks.

### Tokens

- `tokens.css` has two token sets: the original unprefixed one (pre-redesign site) and `--ds-*` (this design system). Never mix them — `src/ui` components use `--ds-*` only.
- Don't hardcode a color/size/spacing value that already has a `--ds-*` token. Add a new `--ds-*` token instead of a one-off value in a component.
- Prefer one component with a `variant` prop over near-duplicate components (e.g. `Label.astro` with `variant="eyebrow" | "section"` instead of separate `Eyebrow.astro` / `SectionLabel.astro`).

### Fonts and layouts

Any top-level layout that renders `<head>` must preload every font it uses with `<Font cssVariable="--font-x" preload />` (from `astro:assets`) and import `@/styles/global.css` so the `:root` tokens are in scope. A layout missing either renders with zero errors, but nothing is actually styled or in the right font — this only shows up visually, never in a check.

## Best Practices

1. **Type Safety**: Always define TypeScript types for props
2. **Scoped Styles**: Never use global styles in components; use scoped `<style>` tags
3. **Conditional Rendering**: Use `{ condition && ... }` for conditional markup
4. **Class Lists**: Use `class:list` for dynamic class management
5. **Component Composition**: Import and use other components when needed
6. **Path Aliases**: Always use the `@/` alias for imports
