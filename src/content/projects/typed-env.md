---
title: typed-env
description: A tiny wrapper around Zod for validating and typing environment variables at startup.
date: 2025-06-02
tags: ['typescript', 'npm', 'zod']
draft: false
repo: https://github.com/example/typed-env
url: https://www.npmjs.com/package/typed-env
featured: false
archived: false
---

Every project ends up with the same ad-hoc `process.env.FOO!` scattered around the codebase, with no validation and no useful error message when a variable is missing in production. `typed-env` wraps a Zod schema around `process.env`, parses it once at startup, and throws a readable error listing every missing or malformed variable instead of failing one `undefined` at a time.

The API is intentionally small: define a schema, call `loadEnv(schema)`, get back a fully typed object. No config file, no CLI, no magic — just a schema and a function.
