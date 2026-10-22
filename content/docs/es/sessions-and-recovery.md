---
title: Sesiones y recuperación
description: Qué sobrevive a cerrar Persisty, a un cuelgue de la app y a un reinicio de la computadora, y cómo Persisty dice qué no volvió.
group: start
order: 3
---

La ventana de Persisty nunca es dueña de tus procesos. Cada terminal corre en un supervisor separado (un tmux integrado en macOS y en Linux, un supervisor propio en Windows), y la ventana solo se conecta a él. Eso es lo que permite cerrar o perder la ventana sin perder trabajo.

## Cierre o cuelgue de la app

Si cierras Persisty, o si se cuelga, las sesiones siguen corriendo en el supervisor. Al abrirlo de nuevo, la app concilia lo que tiene guardado con lo que está vivo y **reconecta** cada terminal, con las últimas líneas del historial.

En este caso no hay que relanzar nada: el agente no nota que la ventana desapareció.

## Reinicio o cuelgue de la computadora

Después de un reinicio, **ningún proceso sobrevive**, en ninguna app. Lo que hace Persisty es relanzar cada sesión a partir de lo que guardó sobre ella: carpeta, comando, agente y el id de la conversación.

- Las sesiones de **Claude Code** vuelven con `claude --resume` en la misma conversación. Cuando el propio Claude Code confirma la retomada, el informe dice **Agente retomado**.
- Las sesiones de **Codex** se relanzan, pero la retomada todavía no se confirma; el informe lo dice.
- Las **terminales** con un comando inicial (por ejemplo `pnpm dev`) se relanzan con el mismo comando.

## Cuándo relanzar

Cada sesión tiene una regla, que eliges al crearla:

| Regla | Qué pasa después de un reinicio |
| --- | --- |
| Relanzar si se cayó (*Relaunch if it went down*) | Relanza cuando abres Persisty. Es la opción predeterminada. |
| Solo reconectar si está viva (*Only reattach if alive*) | No relanza por su cuenta; espera a que lo pidas. |
| Relanzar siempre (*Always relaunch*) | Relanza siempre que la sesión pueda volver, incluso después de terminar con error. |

Para relanzar en el momento lo que quedó atrás, usa **Restaurar todo** (*Restore all*, <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>R</kbd>). Ejecutarlo dos veces no duplica sesiones.

## El informe de restauración

Toda restauración termina en un informe con una línea por sesión: reconectada, relanzada, agente retomado, omitida o falló, con el motivo cuando lo hay. El resumen dice cuántas volvieron, cuántas fallaron y cuántas se omitieron.

Persisty nunca dice que una sesión volvió si no volvió. "Agente retomado" sin confirmación solo quiere decir que el comando de retomada se ejecutó.

## Historial de la terminal

Al reconectar, las últimas 5 000 líneas por encima de la pantalla aparecen en la terminal antes del contenido en vivo. El supervisor guarda hasta 20 000 líneas por sesión.
