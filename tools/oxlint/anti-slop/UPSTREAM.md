# Vendored anti-slop Oxlint plugin

Source: [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) (GitHub), installed via the
`install-anti-slop` Claude Code skill (`skills-lock.json` records
`skillPath: skills/install-anti-slop/SKILL.md`).

Exact source commit: unknown. `skills-lock.json` hashes only the skill's `SKILL.md`, not the
`assets/anti-slop/**` payload copied into this directory, so no revision that specifically
identifies these copied files is currently recoverable. Record the exact commit here once it can
be established (e.g. from a future skill update that pins one).

## Installed plugin paths

- `tools/oxlint/anti-slop/index.ts` — generic plugin entry point, registered in `.oxlintrc.json`
  via `jsPlugins`.
- `tools/oxlint/anti-slop/effect/index.ts` — opt-in Effect plugin, copied but **not registered**
  (this repository has no `effect` dependency).
- `tools/oxlint/anti-slop/vendor/eslint-stylistic/` — vendored `padding-line-between-statements`
  rule from ESLint Stylistic; see its own `UPSTREAM.md` for that rule's provenance.

## Intentional deviations

None. Installed as-is from the skill's bundled assets; no local customizations have been made yet.
