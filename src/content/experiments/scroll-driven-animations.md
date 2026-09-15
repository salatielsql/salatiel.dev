---
title: CSS scroll-driven animations
description: Testing how far pure-CSS scroll timelines can go before you actually need JavaScript.
date: 2025-09-10
tags: ['css', 'animation']
draft: false
demo: https://example.com/demos/scroll-driven-animations
---

A small test page exploring `animation-timeline: scroll()` for progress indicators, parallax, and reveal-on-scroll effects — all without a single scroll event listener. Landed on scroll-driven animations being a solid replacement for the "fade in on scroll" case, but still reaching for JS for anything that needs to read scroll velocity.
