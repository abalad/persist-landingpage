---
title: Sessions and recovery
description: What survives quitting Persisty, an app crash and a computer restart, and how Persisty tells you what did not come back.
group: start
order: 3
---

The Persisty window never owns your processes. Each terminal runs in a separate supervisor (an embedded tmux on macOS and Linux, Persisty's own supervisor on Windows), and the window only connects to it. That is what lets you close or lose the window without losing work.

## Quitting or crashing the app

If you quit Persisty, or it crashes, the sessions keep running in the supervisor. When you open it again, the app reconciles what it saved with what is alive and **reattaches** each terminal, with the last lines of its history.

Nothing needs to be relaunched in this case: the agent does not notice that the window went away.

## Restarting or crashing the computer

After a restart, **no process survives**, in any app. What Persisty does is relaunch each session from what it saved about it: folder, command, agent and conversation id.

- **Claude Code** sessions come back with `claude --resume` in the same conversation. When Claude Code itself confirms the resume, the report says **Agent resumed**.
- **Codex** sessions are relaunched, but the resume is not confirmed yet; the report says so.
- **Terminals** with a startup command (for example `pnpm dev`) are relaunched with the same command.

## When to relaunch

Each session has a rule, chosen when you create it:

| Rule | What happens after a restart |
| --- | --- |
| Relaunch if it went down | Relaunches when you open Persisty. This is the default. |
| Only reattach if alive | Does not relaunch on its own; waits for you to ask. |
| Always relaunch | Relaunches whenever the session can come back, including after it exits with an error. |

To relaunch what was left behind right away, use **Restore all** (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>R</kbd>). Running it twice does not duplicate sessions.

## The restore report

Every restore ends in a report with one line per session: reattached, relaunched, agent resumed, skipped or failed, with the reason when there is one. The summary says how many came back, how many failed and how many were skipped.

Persisty never says a session came back when it did not. "Agent resumed" without confirmation only means the resume command was run.

## Terminal history

When a terminal is reattached, the last 5,000 lines above the screen show in it before the live content. The supervisor keeps up to 20,000 lines per session.
