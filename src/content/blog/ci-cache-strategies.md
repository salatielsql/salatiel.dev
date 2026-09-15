---
title: 'Cache strategies for CI pipelines'
description: 'Where CI time actually goes, and three layers of caching that get most of it back — dependency caches, build artifact caches, and Docker layer caches.'
date: 2025-03-12
tags: ['ci-cd', 'performance', 'devops']
draft: false
---

Most CI pipelines spend the majority of their wall-clock time doing work they already did last run. Installing the same dependencies. Compiling the same unchanged modules. Pulling the same base image layers over the network. None of that is inherent to continuous integration — it's just what happens when caching is an afterthought instead of a design decision.

I've rebuilt the same CI cache strategy often enough across different projects that it's worth writing down as a checklist instead of relearning it every time.

## Dependency caches

This is the easy one and most CI providers handle it out of the box, but the details matter. The cache key needs to be derived from the lockfile, not the manifest — `package.json` changing doesn't mean the resolved dependency tree changed, but `pnpm-lock.yaml` changing always does.

```yaml
- name: Cache pnpm store
  uses: actions/cache@v4
  with:
    path: ~/.local/share/pnpm/store
    key: pnpm-store-${{ hashFiles('pnpm-lock.yaml') }}
    restore-keys: |
      pnpm-store-
```

The `restore-keys` fallback matters more than people give it credit for — a partial cache hit (previous lockfile hash) still saves most of the download time, since most packages didn't change between runs. Don't require an exact match if a fuzzy one gets you 90% of the benefit.

## Build artifact caches

Compiled output — TypeScript's `tsbuildinfo`, bundler caches, test runner caches — is cheaper to restore than to regenerate, provided invalidation is correct. The failure mode here isn't slowness, it's staleness: a bad cache key produces a fast build that ships broken code. I'd rather have a slightly conservative cache key that occasionally misses than one clever enough to occasionally serve the wrong artifact.

A reasonable middle ground: key build caches off a hash of source files plus toolchain versions, and always run the fast incremental build on top of a restored cache rather than trusting the cache as the final output. Incremental build tools are designed to reconcile a stale cache against current source — let them do that job instead of trying to out-guess them with a perfect cache key.

## Docker layer caches

This is where the biggest wins usually hide, and where most Dockerfiles actively work against you. Layer order determines cache invalidation, so anything that changes often — application source — needs to come after anything that changes rarely — system dependencies, then application dependencies.

```yaml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3

- name: Build and push
  uses: docker/build-push-action@v6
  with:
    cache-from: type=gha
    cache-to: type=gha,mode=max
    push: true
```

`mode=max` caches every intermediate layer, not just the final image — worth the extra cache storage if your Dockerfile has multi-stage builds with expensive intermediate steps (native module compilation, for instance).

## What doesn't get cached

Anything that talks to a live external service — integration tests against a real API, anything involving current timestamps or non-deterministic ordering — shouldn't be cache-keyed at all. I've seen teams cache flaky test results to "fix" flakiness, which just converts a visible problem into an invisible one.

The overall shape that's worked well for me: cache aggressively at the dependency and layer level, cache conservatively at the build-artifact level, and never cache anything whose correctness depends on the outside world.
