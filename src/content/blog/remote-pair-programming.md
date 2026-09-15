---
title: 'Remote pair programming that people actually want to do'
description: 'Why most remote pairing sessions fizzle out within a month, and the handful of habits that keep them alive.'
date: 2026-07-30
tags: ['remote-work', 'team-process', 'pair-programming']
draft: false
---

Most teams that try remote pair programming stop within a month, and it's rarely because pairing itself doesn't work — it's because the remote-specific friction never gets addressed, so the sessions quietly get worse until nobody schedules them anymore.

A few things that have made the difference between pairing sessions people avoid and ones people actually look forward to:

Screen share latency turns "driver and navigator" into "driver and someone half a beat behind, guessing at what just happened." The fix isn't a better internet connection, it's switching who's driving more often than feels necessary — every 10-15 minutes rather than the hour-long stretches that work fine in person. Frequent handoffs keep both people actually engaged with the code instead of one person watching a slightly-delayed video feed.

Silence reads completely differently over a call than it does at a shared desk. In person, a quiet stretch while someone thinks is legible — you can see them thinking. Over a call, the same silence is ambiguous: are they thinking, stuck, or did the connection drop? Narrating more than feels natural — "let me look at how this function is called elsewhere" — costs almost nothing and removes that ambiguity entirely.

Tooling matters more than the session's agenda. A shared, editable terminal (not just a shared screen) means the navigator can type a suggestion directly instead of describing it verbally and waiting for the driver to transcribe it — a small change that removes a surprising amount of friction from the whole session. Whatever tool you use, the deciding factor is whether both people can act, not just one person acting while the other watches.

Async handoff notes at the end of a session are worth the two minutes they take. A pairing session that ends with no written trace of what was decided and why tends to need re-litigating from scratch next time, especially across timezones where the two participants won't necessarily pick it back up together. A short note — what we tried, what we ruled out and why, what's next — turns a single session into a thread that survives the gap between sessions.

None of this is exotic advice. It's mostly "compensate deliberately for the bandwidth that in-person pairing gives you for free." The teams that keep pairing alive long-term are the ones that treat those compensations as part of the practice, not friction to tolerate until everyone quietly stops scheduling the sessions.
