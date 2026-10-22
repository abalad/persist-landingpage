---
title: Projects, sessions that survive and the restore report
date: 2026-10-20
---

The first version of Persisty for daily use:

- **Projects** with several workspaces, showing each folder's branch and changes.
- **Persistent sessions** in a supervisor separate from the window: quitting or crashing the app kills nothing, and reopening it reattaches each terminal with its history.
- **Restore all** after restarting the computer, with a report of what came back, what failed and why. Running it twice does not duplicate sessions.
- **Claude Code** with a session id chosen by Persisty, states from hooks and resume with `--resume` confirmed by Claude Code itself.
- **AI usage**: estimated spend by session, project, model and day, always labelled as an estimate.
