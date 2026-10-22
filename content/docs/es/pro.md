---
title: Funciones Pro
description: Cola de pedidos, puntos de restauración, verificación al terminar y carpeta propia por sesión, las funciones que dejan al agente trabajar sin ti.
group: work
order: 2
---

Las funciones Pro están en el **panel lateral de la sesión** (<kbd>⌘</kbd> <kbd>\</kbd>) y en su encabezado. Requieren la cuenta de Persist con el plan Pro; lo que ya se guardó se puede seguir usando si el plan termina.

## Cola de pedidos

Escribe el próximo pedido ahora y elige cuándo va al agente:

- **en cuanto el agente quede libre** (*As soon as the agent is free*);
- **cuando se renueve la ventana de 5 h** (*When the 5-hour window renews*), con la hora leída de la cuota en vivo;
- **a partir de una hora** (*From a chosen time*).

Los pedidos van uno a la vez, en el orden de la cola, y solo cuando el agente está esperando el próximo pedido; nunca en medio de un trabajo ni encima de un pedido de permiso. Cada pedido se pega de una sola vez, así que los saltos de línea no lo envían en pedazos.

La cola se revisa cada 10 segundos con Persist abierto. Con la app cerrada, no se envía nada.

## Puntos de restauración

Cada pedido a un agente guarda el estado de la carpeta de la sesión antes de que el agente empiece, con la primera línea del pedido como nombre. En la pestaña **Puntos de restauración** (*Restore points*) ves qué volvería y qué se borraría antes de confirmar. Restaurar guarda el estado actual como un punto nuevo, para que puedas deshacerlo.

- Funciona en carpetas git y con agentes que avisan el pedido por hook (Claude Code).
- Guarda los archivos rastreados y los nuevos; lo que ignora el `.gitignore` queda fuera.
- La rama, el HEAD y el índice de git no cambian; los commits que hizo el agente no se deshacen.
- Los puntos quedan como commits en `refs/persist/checkpoints/`, que un `git push` común no envía. Son 50 por sesión.

## Verificar al terminar

Elige un comando del workspace (por ejemplo `pnpm test`) en **Verificar al terminar con…** (*Check on finish with…*). Cuando el agente se detiene después de cambiar archivos, el comando corre solo en la carpeta de la sesión, y el encabezado dice si pasó, si falló (con el código de salida) o si todavía está corriendo.

Vale para sesiones de agente dentro de un workspace. El resultado no se envía al agente.

## Carpeta propia por sesión

En carpetas git, la sesión nueva puede recibir una rama `persist/<nombre>` en una carpeta solo suya (un git worktree), para que dos agentes nunca editen los mismos archivos.

- La carpeta queda en `~/.persist/worktrees` y no trae lo que git ignora (`node_modules`, `.env`, builds).
- Al cerrar la sesión, Persist pregunta si la carpeta se queda, se elimina o se elimina descartando los archivos sin commit, y dice cuántos commits guarda la rama.
- La rama nunca se borra.
