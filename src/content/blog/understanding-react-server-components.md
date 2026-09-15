---
title: 'Understanding React Server Components'
description: 'What actually changes when a component runs on the server — not the pitch, the mechanics: what can and cannot cross the boundary, and why it matters.'
date: 2025-09-18
tags: ['react', 'rsc', 'architecture']
draft: false
---

The pitch for React Server Components is usually "components that run on the server," which is true but not the useful part. Plenty of things already ran on the server before RSC — templating engines have done it for decades. The useful part is that server and client components compose in the same tree, with an explicit, enforced boundary between them.

## The boundary is the feature

A Server Component runs once, on the server, and never ships its code to the browser — no hooks, no event handlers, no re-renders. A Client Component (anything marked `'use client'`) ships its JavaScript and behaves like the React you already know. The boundary between them isn't just a performance optimization, it's a type-level guarantee about what can leak where.

```tsx
// ProductPage.tsx — Server Component (default, no directive needed)
import { AddToCartButton } from './AddToCartButton'
import { db } from '@/lib/db'

export default async function ProductPage({ id }: { id: string }) {
  const product = await db.product.findUnique({ where: { id } })

  return (
    <article>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* db never reaches the client — the import itself is server-only */}
      <AddToCartButton productId={product.id} price={product.price} />
    </article>
  )
}
```

```tsx
// AddToCartButton.tsx — Client Component
'use client'

import { useState } from 'react'

export function AddToCartButton({ productId, price }: { productId: string; price: number }) {
  const [pending, setPending] = useState(false)

  return (
    <button disabled={pending} onClick={() => setPending(true)}>
      Add to cart — ${price}
    </button>
  )
}
```

`db` is imported directly inside a Server Component with no API route, no serialization step, no client-side fetch waterfall. It never appears in the client bundle because the bundler can statically see it's only reachable from server-only code.

## What can and can't cross

Props passed from a Server Component into a Client Component have to be serializable — plain data, not functions, not class instances, not database connections. This isn't an arbitrary restriction; it's the same constraint that any client-server boundary has always had, just made explicit and enforced at build time instead of failing at runtime with a confusing error.

The direction that's easy to forget: a Client Component can still receive a Server Component as `children`, even though it can't import one directly. That's what lets things like layout shells stay client-interactive (a sidebar toggle, say) while still hosting server-rendered content passed down from above.

## Where it actually pays off

The wins are concentrated in data-heavy pages — dashboards, catalogs, anything that would otherwise need a client-side fetch waterfall or an API route that only exists to feed one component. For a form with a handful of interactive fields and no real data dependency, RSC doesn't buy much; the honest trade-off is added mental model complexity in exchange for less client JavaScript, and that trade isn't always worth making for every component in an app.

```agent-context
┌─ agent-context ──────────────────────────┐
│ page: blog-post                          │
│ topic: react-server-components           │
│ audience: frontend-engineers             │
│ format: annotated-markdown                │
└────────────────────────────────────────────┘
```
