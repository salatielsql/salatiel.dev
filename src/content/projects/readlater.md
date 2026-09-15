---
title: readlater
description: A minimal read-it-later app with full-text search, built to avoid the bloat of the mainstream options.
date: 2023-11-08
tags: ['web', 'sqlite', 'side-project']
draft: false
repo: https://github.com/example/readlater
featured: false
archived: true
---

A self-hosted bookmarking app: save a URL, it fetches a readable version of the page, indexes it for full-text search, and strips everything else. No social features, no recommendations, no tracking.

It worked well enough that I used it daily for over a year, but the maintenance cost of running the readability-extraction pipeline eventually outweighed the value over just using a hosted alternative. Keeping the repo around as a reference for the extraction pipeline, which is the part I'd reuse.
