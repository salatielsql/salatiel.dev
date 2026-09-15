---
title: 'Container queries in practice'
description: 'Media queries answer "how big is the viewport." Container queries answer "how big is this component" — a small shift that fixes a real class of layout bugs.'
date: 2026-02-09
tags: ['css', 'responsive-design']
draft: false
---

A card component that looks fine in a wide main column and cramped in a narrow sidebar is a symptom of the wrong question being asked. Media queries can only answer "how wide is the viewport," but the layout decision that actually matters is "how wide is the space this component has been given" — and those are frequently different numbers on the same page at the same time.

Container queries close that gap by letting a component query its own containing element instead of the viewport.

```css
.card-list {
  container-type: inline-size;
  container-name: card-list;
}

.card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

@container card-list (min-width: 480px) {
  .card {
    grid-template-columns: auto 1fr;
    align-items: start;
  }
}
```

`container-type: inline-size` is the piece that's easy to forget — without declaring a containment type on the ancestor, `@container` queries have nothing to measure against and silently do nothing. The `container-name` is optional but worth adding once a page has more than one containment context, so a nested component can target the right ancestor instead of whichever one happens to be closest.

## Where this actually changes the layout, not just the syntax

The case that used to require real workarounds — a duplicate component variant, or a prop threaded down purely to say "I'm in the sidebar" — is exactly what container queries remove. The same `.card` component now adapts correctly whether it's rendered in a 320px sidebar or a 900px main column, without the parent page needing to tell it anything.

```css
.card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
}

@container card-list (max-width: 320px) {
  .card__meta {
    flex-direction: column;
  }
}
```

## The rollout caveat

Container queries need `overflow` other than `visible` on the containment context in some browser implementations for `container-type: size` (both axes) — `inline-size` avoids that specific gotcha since it only measures the horizontal axis, which is what most component-level responsive layouts actually need. If a design genuinely needs to respond to available height as well as width, that's the case worth testing carefully across browsers before shipping, since it's the less common and less battle-tested path.

The practical migration path I've used: leave existing viewport-based media queries alone for page-level layout (nav bars, overall grid columns), and reach for container queries specifically for components that get reused across differently-sized contexts. Retrofitting every media query to a container query isn't the goal — using the right query for the question actually being asked is.
