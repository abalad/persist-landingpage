---
title: Privacidad y registro de red
description: Qué se queda en tu máquina, qué sale y cómo revisar cada llamada de red de Persist.
group: account
order: 2
---

Persist es local: proyectos, sesiones, historial, notas y uso quedan en una base de datos SQLite en tu máquina. No hay telemetría.

## Lo que nunca sale

El código, la salida de la terminal y los prompts nunca salen de tu máquina a través de Persist. Los agentes hablan con sus proveedores como lo harían sin Persist.

## Lo que sale, y por qué

La app solo habla con afuera para:

- leer la cuota de Claude Code (`api.anthropic.com`), con la credencial que Claude Code ya guarda; el token no se guarda ni se registra;
- entrar a la cuenta de Persist Cloud y renovar la licencia.

## Registro de red

En **Configuración › Red** (*Settings › Network*), cada llamada que hizo la app desde que se abrió aparece con destino, motivo, tamaño, resultado y hora. Los encabezados, el cuerpo y los parámetros nunca se muestran ni se guardan. El registro se vacía al cerrar la app.

Más detalles en [Seguridad](/security) y en la [Política de privacidad](/privacy).
