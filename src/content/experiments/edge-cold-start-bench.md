---
title: Edge function cold start benchmark
description: A small harness comparing cold-start latency across a few edge runtimes under identical workloads.
date: 2025-04-22
tags: ['performance', 'edge', 'benchmarking']
draft: false
repo: https://github.com/example/edge-cold-start-bench
---

Same handful of endpoints (JSON echo, a small template render, a signed-cookie check) deployed to a few different edge runtimes, hit cold every time via a fresh deploy per run to avoid warm-pool skew. Mostly wanted a number to point to next time "just use edge functions" comes up in a design discussion, instead of relying on vibes.
