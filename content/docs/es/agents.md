---
title: Agentes y estados
description: Cómo reconoce Persist a Claude Code y a Codex y muestra quién está trabajando, quién te espera y quién pide permiso.
group: start
order: 4
---

Persist reconoce agentes de dos formas: cuando abres la sesión como Claude Code o Codex, y cuando escribes `claude` en una terminal común abierta por Persist. En los dos casos la sesión recibe el ícono del agente, el estado y el costo.

## Los estados

| Estado | Qué quiere decir |
| --- | --- |
| Trabajando | El agente recibió un pedido y todavía no terminó. |
| Esperándote | Terminó su turno y espera el próximo pedido. |
| Permiso pendiente | Quiere ejecutar algo y espera tu "sí" en la terminal. |
| Inactivo | Abierto, sin ningún pedido en curso. |
| Terminada | La conversación terminó. |

Los estados aparecen en la pestaña, en la tarjeta del workspace, en la barra de proyectos y en la lista de agentes. Siempre vienen con ícono y palabra, nunca solo con color.

## De dónde viene el estado

En Claude Code, el estado viene de los **hooks** del propio Claude: eventos que dispara al empezar, al recibir un pedido, al detenerse y al pedir permiso. Persist inyecta esos hooks en cada sesión con `--settings`, en un archivo solo suyo. Tu `~/.claude/settings.json` nunca se modifica.

Si Claude Code muestra el aviso de confianza de la carpeta ("Yes, I trust this folder"), este aparece antes de cualquier hook. Persist no se salta ese aviso: el estado queda desconocido hasta que respondes en la terminal.

## Codex

Codex se abre y persiste como cualquier sesión. Tienes que aprobar sus hooks dentro del propio Codex (`/hooks`). Sin esa aprobación, el estado queda desconocido. La retomada después de un reinicio todavía no está confirmada, y Persist lo marca.

## Modelo por sesión

La barra inferior de la sesión tiene un selector de modelo. La elección queda guardada y se pasa con `--model` en cada lanzamiento y en cada retomada. En una sesión ya abierta, Persist escribe `/model` por ti.
