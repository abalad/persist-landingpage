---
title: Privacy and the network log
description: What stays on your machine, what goes out, and how to check every network call Persist makes.
group: account
order: 2
---

Persist is local: projects, sessions, history, notes and usage stay in a SQLite database on your machine. There is no telemetry.

## What never leaves

Code, terminal output and prompts never leave your machine through Persist. The agents talk to their providers as they would without Persist.

## What goes out, and why

The app only reaches out to:

- read Claude Code's quota (`api.anthropic.com`), with the credential Claude Code already stores; the token is neither saved nor logged;
- sign in to the Persist Cloud account and renew the licence.

## Network log

In **Settings › Network**, every call the app has made since it opened shows up with destination, reason, size, result and time. Headers, body and parameters are never shown or kept. The log is cleared when you quit the app.

More details on [Security](/security) and in the [Privacy policy](/privacy).
