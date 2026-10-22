---
title: Seguridad
description: Cómo protege Persist tus terminales, tus credenciales y tu cuenta, y lo que todavía está por venir.
updated: 2026-10-22
---

Persist ejecuta comandos con tus permisos y abre agentes que usan herramientas en tu máquina. Por eso cada decisión de seguridad se toma para no crear un camino nuevo hacia tu código.

## En tu máquina

- **Supervisor privado.** El servidor que mantiene las sesiones vive en un directorio solo tuyo, con el socket accesible solo para tu usuario. No hay ningún puerto de red abierto.
- **Nada de comandos de shell armados con texto.** Los comandos y las rutas se pasan como argumentos, nunca como una línea de shell, y la carpeta se verifica antes de lanzar.
- **Tu configuración intacta.** Los hooks de Claude Code entran por un archivo propio de Persist, que se pasa con `--settings`. Tu `~/.claude/settings.json` nunca se lee ni se modifica, y Persist no edita los hooks de Codex.
- **Permisos de los agentes respetados.** Persist nunca pasa opciones que se salten los pedidos de permiso de los agentes.
- **Credenciales donde ya estaban.** El login de las cuentas de IA lo hace el propio Claude Code; la credencial queda con él. El token que se usa para leer la cuota no se guarda ni aparece en ningún log, y solo va a `api.anthropic.com`.
- **Los eventos no ejecutan nada.** Lo que los agentes escriben en los eventos solo cambia el estado que se muestra en pantalla.

## En la nube

- **Metadatos, nunca código.** Persist Cloud no recibe código, salida de la terminal ni prompts.
- **Acceso por fila.** Todas las tablas tienen reglas de acceso por usuario (RLS), con pruebas que demuestran lo que un miembro, un administrador y un extraño pueden leer y escribir.
- **Licencia firmada.** La licencia se firma con Ed25519 y la app la verifica sin red. La clave privada nunca sale del servidor.
- **Registro de red.** Cada llamada que hace la app aparece en **Configuración › Red** (*Settings › Network*), sin encabezados ni contenido.

## En desarrollo y planificado

| Ítem | Estado |
| --- | --- |
| App firmada y notarizada en macOS | En desarrollo |
| Auditoría de dependencias y vulnerabilidades en el CI | Planificado |
| Auditoría de seguridad externa antes del primer cliente grande | Planificado |
| Código fuente disponible para auditoría en Enterprise, bajo confidencialidad | Planificado |

## ¿Encontraste un problema?

{{contact}}
