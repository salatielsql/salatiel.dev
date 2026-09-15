---
title: 'Code review that does not suck'
description: 'A short list of habits that make review faster and less adversarial, for both the person opening the PR and the person reading it.'
date: 2025-06-04
tags: ['code-review', 'team-process']
draft: false
---

Bad code review is slow, adversarial, and inconsistent — the same change gets nitpicked to death one week and rubber-stamped the next, depending on who happens to look at it and how much time they have. None of that is about the code. It's about process, and process is fixable.

A few habits that have consistently made review better on teams I've worked with:

- **Keep PRs small enough to hold in your head.** A 40-line diff gets a real review. A 900-line diff gets an approval based on trust, not reading. If a change genuinely can't be split, say so in the description and explain why — reviewers extend more patience to a large PR that acknowledges its own size.
- **Write the description for someone with zero context.** Not what changed — a diff already shows that — but why, and what alternatives were considered and rejected. The best PR descriptions answer the review comments before anyone gets a chance to ask.
- **Separate blocking feedback from suggestions.** "This will break under concurrent writes" and "you could use `Array.flat()` here" are not the same category of comment, but they read identically in a GitHub review thread unless the reviewer explicitly labels them. I've started prefixing optional comments with `nit:` — it's a small thing that measurably reduces back-and-forth.
- **Review the tests before the implementation.** Tests describe the intended behavior; if you understand what's being guaranteed, the implementation is much faster to evaluate against that bar. Reading it the other way around means implicitly trusting the implementation to define its own correctness.
- **Approve with comments instead of blocking on style.** If nothing you're flagging would cause you to revert this in production, it's not a blocking comment. Leave it, approve, let the author decide whether it's worth a follow-up.

The meta-habit underneath all of these: review is a conversation about risk, not a test of the author's competence. Once a team internalizes that framing, the rest of the specific habits tend to follow naturally — you ask "what could go wrong" instead of "what would I have done differently," and those are very different reviews to receive.
