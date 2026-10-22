---
title: Editor, changes and notes
description: The editor beside the terminal, the git changes tab, project search and notes.
group: work
order: 3
---

The session side panel (<kbd>⌘</kbd> <kbd>&#92;</kbd>) brings together what you need to check the agent's work without leaving it. A row of icons switches between **Changes**, **Code**, **Search**, **Notes** and **Details**. You can drag the divider between the terminal and the panel.

## Code

The editor opens the session's folder as a tree. Files ignored by git show dimmed.

- <kbd>⌘</kbd> <kbd>P</kbd> opens a file by name; <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>F</kbd> searches all files; <kbd>⌘</kbd> <kbd>F</kbd> finds and replaces in the open file; <kbd>⌘</kbd> <kbd>S</kbd> saves.
- Syntax highlighting per language, loaded on demand, in the same theme as the terminal.
- Git marks in the gutter and a diff against HEAD.
- If the file changes on disk (the agent edited it), Persisty warns you: reload it or keep your version. Tabs with no changes reload on their own.

There is no smart autocomplete and no "go to definition". Binary files and files over 5 MB do not open.

## Changes

The **Changes** tab (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>G</kbd>) shows the changed files with git's status letters. Stage or unstage file by file or everything at once, write the message and commit with <kbd>⌘</kbd> <kbd>↵</kbd>, or use **Commit and push**. The history shows what has not been pushed yet and the files in each commit.

Discarding changes and resolving conflicts stay in the terminal beside it. If git asks for a password to push, Persisty shows the refusal as git wrote it.

## Notes

Each project has notes in Markdown, saved on their own in Persisty's local database.
