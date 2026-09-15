---
title: Local-first sync prototype
description: A CRDT-backed proof of concept for syncing a small notes app across devices without a central write path.
date: 2025-01-17
tags: ['crdt', 'local-first']
draft: false
repo: https://github.com/example/local-first-sync-poc
---

A weekend proof of concept using a CRDT library to sync a tiny notes app between two browser tabs (standing in for two devices) with no server-side merge logic — the server just relays opaque updates. Good enough to convince me the model works for low-write-conflict data like notes, less convincing for anything with structural relationships between records.
