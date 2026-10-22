---
title: Getting started
description: What Persist is, how to install it and how to open your first project with an agent session.
group: start
order: 1
---

Persist is a desktop app for people who maintain several software products and work with AI agents in the terminal, such as Claude Code and Codex. It keeps each terminal in a supervisor separate from the window, organises everything by project and tracks each agent's state and quota.

Nothing you do in Persist depends on an account or on the internet. The account only exists for the paid plans.

## Install

1. Download the build for your system from the [download page](/download). Until there is a public build, tick "Notify me" to hear about it.
2. Open Persist. The supervisor that keeps sessions alive ships inside the app; you do not need to install tmux or any other dependency.
3. To use agents, have [Claude Code](https://docs.claude.com/en/docs/claude-code) installed and signed in. Plain terminals work without it.

## Create your first project

A **project** is one of your products or clients, not a folder. Inside it are the **workspaces**: that product's folders and repositories.

1. Click the **+** in the project bar, on the left, and give it a name.
2. Drag a folder from Finder onto the marked area, or click and choose one. It becomes the first workspace. If it is a git repository, Persist shows the branch and the changes.
3. Repeat for the product's other repositories (API, app, website).

## Open a session

With the workspace selected, press <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>N</kbd> and choose what to open:

- **Claude Code** or **Codex**, for an agent session;
- **Terminal**, for a plain shell (dev server, tests, whatever you like).

The session shows as a tab at the top and as a row in the workspace card at the bottom. Close the Persist window whenever you like: the session keeps running, and reopening the app reattaches the terminal with its history.

## Next steps

- [Projects and workspaces](/docs/projects-and-workspaces): how Persist organises your work.
- [Sessions and recovery](/docs/sessions-and-recovery): what survives quitting the app, a crash and a restart.
- [Agents and states](/docs/agents): how to tell which agent needs you.
