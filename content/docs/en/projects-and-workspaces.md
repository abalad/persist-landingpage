---
title: Projects and workspaces
description: How Persisty organises products, folders, sessions and agents in a single window.
group: start
order: 2
---

Persisty organises work in three levels, from largest to smallest.

| Level | What it is | Where it shows |
| --- | --- | --- |
| Project | One of your products, clients or businesses | Project bar, on the left |
| Workspace | A folder of that project, with or without git | Cards in the bottom strip |
| Session | A terminal: an agent or a shell | Tabs at the top |

## Project bar

Each project is a block with the initial of its name. A coloured dot tells you when something there needs you: yellow for an agent waiting for an answer or asking for permission, blue for work in progress.

Press <kbd>⌘</kbd> <kbd>B</kbd> to expand the bar. Expanded, it shows each project's name and state and the **Agents** list, with each agent's state and workspace. The filter switches between the agents of the current project and the agents of all projects.

Switch projects with <kbd>⌘</kbd> <kbd>1</kbd> to <kbd>⌘</kbd> <kbd>9</kbd>.

## Workspaces

Each card in the bottom strip is a folder of the project. When the folder is a git repository, the card shows the branch and how many files changed. Inside the card are that workspace's sessions, each with its state in words.

The **Standalone** card holds sessions that do not belong to any workspace. <kbd>⌘</kbd> <kbd>J</kbd> collapses the strip into icons when you want more room for the terminal.

## Sessions

The tabs at the top are the sessions of the selected workspace. The **+** opens a new terminal right there; <kbd>⌘</kbd> <kbd>←</kbd> and <kbd>⌘</kbd> <kbd>→</kbd> move to the previous or next session.

The session header shows the name, the state and the folder's branch. The branch follows switches made in the terminal, and clicking it opens a picker with search to switch or create branches.

## Workspace commands

Commands you run all the time (the dev server, the tests, the build) can be saved in the workspace. Each run becomes a tab in the command drawer, with its state written out: running, done, stopped. Stopping a command sends Ctrl-C, as in the terminal, and keeps the output.
