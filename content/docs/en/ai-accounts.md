---
title: AI accounts and rotation
description: Connect several Claude Code accounts, follow each one's quota live and let Persisty pick the account for each new session.
group: work
order: 1
---

**Settings › AI accounts** holds this computer's Claude Code accounts: the one that was already signed in and the ones you connect through Persisty. Each one shows its organisation, plan and the **5-hour** and **7-day** windows.

## Connect an account

1. In AI accounts, click **Connect account**.
2. Persisty runs Claude Code's own sign-in (`claude auth login`) for a folder used only by that account, and the browser opens.
3. Finish signing in in the browser. The account shows up on its own. If the browser cannot get back to the app, paste the code it shows.

Persisty never sees your password and does not store the credential: Claude Code stores it. Settings, instructions, agents, commands and skills are shared with this computer's account; sign-in and history never are.

To remove an account, use **Disconnect**: Persisty runs Claude Code's logout and deletes that account's folder.

## Live quota

The 5 h and 7 d bars come from the same place as Claude Code's `/usage`, with the credential it already stores on the machine. Persisty checks at most once a minute per account (the service refuses more frequent checks) and keeps the latest numbers on screen between checks.

## Rotation (Pro)

With **Rotate between accounts** turned on, each new Claude Code session goes to the account with the most room in its 5-hour window. Accounts at 90% or more sit out until they renew. The new session form gets the **Automatic** option.

Rotation picks the account when the session is created. A session that is already open does not switch accounts on its own when the quota runs out; to keep going without you, use the [request queue](/docs/pro#request-queue), which waits for the window to renew.

## About using several accounts

Persisty does not create accounts or touch limits. It uses the accounts you already have, such as your personal one and your company's, through Claude Code's own sign-in. Following each account's terms stays with you.
