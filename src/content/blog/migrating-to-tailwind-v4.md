---
title: 'Notes on migrating to Tailwind v4'
description: 'What actually changed in the v3 to v4 migration, tracked as a running checklist while working through a real codebase.'
date: 2026-05-21
tags: ['css', 'tailwind', 'migration']
draft: false
---

Tailwind v4 moves configuration from a JavaScript file into CSS itself, rewrites the engine for a large build-speed jump, and drops a handful of utilities in favor of native CSS features that didn't exist when the old ones were added. None of that is a small point release, and the upgrade path is closer to "review every customization" than "bump the version and see what breaks."

Keeping this as a running checklist while working through the migration on a real project, rather than pretending it all happened in one clean pass:

- [x] Run the official upgrade tool (`npx @tailwindcss/upgrade`) as a first pass, not a final answer — it handles the mechanical renames but not judgment calls
- [x] Move `tailwind.config.js` theme values into `@theme` blocks in CSS — this is the biggest structural change and the one the upgrade tool handles best
- [x] Replace `@tailwind base/components/utilities` directives with the single `@import "tailwindcss"`
- [x] Audit every custom plugin — the plugin API changed shape and none of the v3 plugins I had carried over without edits
- [ ] Re-check every arbitrary value utility (`w-[327px]`, `bg-[#1a56b8]`) — the v4 parser is stricter about syntax that the v3 parser silently tolerated
- [ ] Confirm the new default border color (`currentColor` instead of the old gray-200 default) hasn't silently changed any un-styled borders
- [ ] Re-run visual regression snapshots across breakpoints before calling the migration done

The two unchecked items around arbitrary values and the border color default are the ones actually worth being careful about — they're silent, not build-breaking. A stricter arbitrary-value parser throws a build error, which is annoying but safe. A changed default color renders successfully and just looks subtly wrong, which is the kind of regression that survives a PR review and gets caught by a user instead.

## The part that's easy to underestimate

The `@theme` migration reads like a mechanical find-and-replace, but it's a good forcing function to actually look at what's in the theme file. Half of what accumulates in a multi-year `tailwind.config.js` is dead — color scales nobody references anymore, spacing values added for one component that got deleted. Migrating value-by-value instead of copy-pasting the whole file is slower, but it's the difference between a v4 theme that reflects what the codebase actually uses and one that just carries forward years of unaudited cruft into a new format.
