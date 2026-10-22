---
title: Usage, cost and quota
description: Spend per session, context used and the 5-hour and 7-day windows, with what each number means.
group: work
order: 4
---

The footer of every agent session shows the model, the spend, the context used and the 5 h and 7 d windows. The **Details** panel (<kbd>⌘</kbd> <kbd>I</kbd>) and **Settings › AI usage** gather these numbers by project, model and day.

## Spend

Spend comes from Claude Code's local records and from the status line it calculates itself. Token-based estimates use list prices with a date and a source, and **are not the invoice** from the provider.

## Quota

The 5-hour and 7-day windows are percentages of the subscription, not money. They come from the same service as Claude Code's `/usage` and are checked at most once a minute. Per-model windows, when there are any, show in the Details panel.

Each session shows the account it runs under (e-mail and plan). If you have several accounts, see [AI accounts and rotation](/docs/ai-accounts).

## Context

The context percentage is how much of the model's context window the conversation already takes up, according to Claude Code itself.
