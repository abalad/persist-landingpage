---
title: Embedded supervisor and builds for Windows and Linux
date: 2026-10-21
---

- The tmux that keeps sessions alive now ships **inside the app** on macOS and Linux. You no longer need to install anything separately.
- On Windows, Persisty's own supervisor (`persist-supervisord`) does the same job. Agents work without a POSIX shell: Claude Code's hooks call a native executable.
- There is an installer for Windows, and `.deb` and AppImage packages are set up for Linux. Neither has been tested on real machines yet, and both will ship as a preview.
- Fixed: agent events could be lost when a line was read while it was still being written.
