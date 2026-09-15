---
title: snapcache
description: A CLI that snapshots and restores CI build caches across runners without a remote cache backend.
date: 2025-03-14
tags: ['cli', 'rust', 'developer-tools']
draft: false
repo: https://github.com/example/snapcache
featured: true
archived: false
---

Most CI cache backends assume you're willing to run (and pay for) a remote store. `snapcache` takes a different approach: it snapshots a build cache directory into a content-addressed local archive and restores it on the next run, using a fast hash of the lockfile and toolchain versions as the cache key.

It's a small Rust binary with no runtime dependencies, meant to sit in front of whatever cache directory your build tool already uses (`node_modules/.cache`, `target/`, `.next/cache`, etc.). The interesting part was getting the hashing fast enough that computing the cache key never dominates the time it saves.

Started as a weekend project after watching a CI pipeline spend more time restoring a cache than it would have taken to rebuild from scratch.
