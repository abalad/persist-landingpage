---
title: Pro features
description: Request queue, restore points, check on finish and own folder per session, the features that let the agent work without you.
group: work
order: 2
---

The Pro features live in the **session side panel** (<kbd>⌘</kbd> <kbd>\</kbd>) and in the session header. They require a Persist account on the Pro plan; what has already been saved stays usable if the plan ends.

## Request queue

Write the next request now and choose when it goes to the agent:

- **as soon as the agent is free**;
- **when the 5-hour window renews**, with the time read from the live quota;
- **from a chosen time**.

Requests go one at a time, in queue order, and only when the agent is waiting for its next request; never in the middle of work or over a permission request. Each request goes as a single paste, so line breaks do not send it in pieces.

The queue is checked every 10 seconds while Persist is open. With the app closed, nothing is sent.

## Restore points

Each request to an agent saves the state of the session's folder before the agent starts, named after the request's first line. In the **Restore points** tab you see what would come back and what would be deleted before you confirm. Restoring saves the current state as a new point, so you can undo it.

- It works in git folders and with agents that report the request through a hook (Claude Code).
- It saves tracked and new files; whatever `.gitignore` ignores is left out.
- The git branch, HEAD and index do not change; commits made by the agent are not undone.
- Points are stored as commits under `refs/persist/checkpoints/`, which a regular `git push` does not send. There are 50 per session.

## Check on finish

Pick a workspace command (for example `pnpm test`) under **Check on finish with…**. When the agent stops after changing files, the command runs on its own in the session's folder, and the header says whether it passed, failed (with the exit code) or is still running.

This applies to agent sessions inside a workspace. The result is not sent to the agent.

## Own folder per session

In git folders, a new session can get a `persist/<name>` branch in a folder of its own (a git worktree), so two agents never edit the same files.

- The folder lives in `~/.persist/worktrees` and does not bring along what git ignores (`node_modules`, `.env`, builds).
- When you close the session, Persist asks whether to keep the folder, remove it, or remove it and discard the uncommitted files, and says how many commits the branch holds.
- The branch is never deleted.
