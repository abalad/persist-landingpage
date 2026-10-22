---
title: Proyectos, sesiones que sobreviven y el informe de restauración
date: 2026-10-20
---

La primera versión de uso diario de Persist:

- **Proyectos** con varios workspaces, que muestran la rama y los cambios de cada carpeta.
- **Sesiones persistentes** en un supervisor separado de la ventana: cerrar la app, o que se caiga, no mata nada, y al volver a abrirla cada terminal se reconecta con el historial.
- **Restaurar todo** (*Restore all*) después de reiniciar la computadora, con un informe de lo que volvió, de lo que falló y por qué. Ejecutarlo dos veces no duplica sesiones.
- **Claude Code** con un id de sesión elegido por Persist, estados por los hooks y retomada con `--resume` confirmada por el propio Claude Code.
- **Uso de IA**: gasto estimado por sesión, proyecto, modelo y día, siempre marcado como estimación.
