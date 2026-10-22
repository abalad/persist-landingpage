---
title: Supervisor integrado y builds para Windows y Linux
date: 2026-10-21
---

- El tmux que mantiene vivas las sesiones ahora va **dentro de la app** en macOS y en Linux. Ya no hace falta instalar nada aparte.
- En Windows, un supervisor propio (`persist-supervisord`) cumple el mismo papel. Los agentes funcionan sin shell POSIX: los hooks de Claude Code llaman a un ejecutable nativo.
- Hay un instalador para Windows y paquetes `.deb` y AppImage configurados para Linux. Ninguno de los dos se probó todavía en máquinas reales, y van a salir como versión preliminar.
- Corregido: los eventos de los agentes se podían perder cuando una línea se leía en medio de la escritura.
