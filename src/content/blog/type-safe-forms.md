---
title: 'Type-safe forms without fighting the type system'
description: 'Wiring Zod schemas straight into form state so validation, types, and error messages come from one source instead of three.'
date: 2025-11-27
tags: ['typescript', 'forms', 'zod']
draft: false
---

Forms are where a lot of otherwise well-typed codebases quietly give up. Field values come in as strings from the DOM, validation logic lives in a separate function that doesn't know about the form's shape, and the type that describes "the data after validation" is usually just asserted into existence with `as`. None of that is necessary once you let a single schema drive all three.

## One schema, three consumers

A Zod schema can serve as the runtime validator, the TypeScript type, and the source of field-level error messages, all from one definition:

```ts
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  age: z.coerce.number().int().min(13, 'You must be at least 13'),
})

type SignupInput = z.infer<typeof signupSchema>

function validate(formData: FormData): { data: SignupInput } | { errors: Record<string, string> } {
  const raw = Object.fromEntries(formData)
  const result = signupSchema.safeParse(raw)

  if (!result.success) {
    const errors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      errors[String(issue.path[0])] = issue.message
    }
    return { errors }
  }

  return { data: result.data }
}
```

`z.coerce.number()` is doing real work here — raw `FormData` values are always strings, and coercing at the schema boundary means the rest of the code deals with an `age: number`, not `age: string` that happens to look numeric. Without that, either the schema fights the actual runtime shape of form data, or the coercion logic ends up scattered across every call site instead of centralized in one place.

## Error messages that point at the right field

The `issue.path` array is what makes per-field error display straightforward instead of a manual string-matching exercise. For flat schemas the path is a single key; for nested objects (a shipping address inside an order form, say) it's a path array you can join to build a dotted key, and the same reducer handles both shapes without special-casing depth.

## Where this breaks down

Schema-driven validation works cleanly for "shape and format" rules — required fields, string patterns, numeric ranges. It works less cleanly for validation that depends on other system state: "this email isn't already registered" needs a database round-trip, which doesn't fit inside a synchronous schema check. The honest split is schema validation for anything statically knowable from the submitted data, and a separate async validation step — run after the schema passes — for anything that needs to ask the outside world a question. Trying to cram both into one Zod schema via `.refine()` with an async database call inside it works, technically, but it couples your validation layer to your database in a way that makes the schema harder to reuse and test in isolation.
