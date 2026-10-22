---
title: Agents and states
description: How Persisty recognises Claude Code and Codex and shows who is working, who is waiting for you and who is asking for permission.
group: start
order: 4
---

Persisty recognises agents in two ways: when you open the session as Claude Code or Codex, and when you type `claude` in a plain terminal opened by Persisty. Either way, the session gets the agent's icon, state and cost.

## The states

| State | Meaning |
| --- | --- |
| Working | The agent received a request and has not finished yet. |
| Waiting for you | It finished its turn and is waiting for the next request. |
| Permission pending | It wants to run something and is waiting for your "yes" in the terminal. |
| Idle | Open, with no request in progress. |
| Ended | The conversation is over. |

States show on the tab, on the workspace card, in the project bar and in the agent list. They always come with an icon and a word, never with colour alone.

## Where the state comes from

In Claude Code, the state comes from Claude's own **hooks**: events it fires when it starts, when it receives a request, when it stops and when it asks for permission. Persisty injects these hooks into each session with `--settings`, in a file of its own. Your `~/.claude/settings.json` is never changed.

If Claude Code shows the folder trust prompt ("Yes, I trust this folder"), the prompt comes before any hook. Persisty does not skip it: the state stays unknown until you answer in the terminal.

## Codex

Codex opens and persists like any session. You have to approve its hooks inside Codex itself (`/hooks`). Without that approval, the state stays unknown. Resume after a restart has not been confirmed yet, and Persisty marks this.

## Model per session

The session footer has a model picker. Your choice is saved and passed with `--model` on every launch and resume. In a session that is already open, Persisty types `/model` for you.
