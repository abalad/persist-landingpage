---
title: Uso, costo y cuota
description: Gasto por sesión, contexto usado y las ventanas de 5 horas y 7 días, con lo que quiere decir cada número.
group: work
order: 4
---

La barra inferior de cada sesión de agente muestra el modelo, el gasto, el contexto usado y las ventanas de 5 h y 7 d. El panel **Detalles** (*Details*, <kbd>⌘</kbd> <kbd>I</kbd>) y **Configuración › Uso de IA** (*Settings › AI usage*) reúnen esos números por proyecto, modelo y día.

## Gasto

El gasto viene de los registros locales de Claude Code y de la status line que el propio Claude Code calcula. Las estimaciones por tokens usan precios de lista con fecha y origen, y **no son la factura** del proveedor.

## Cuota

Las ventanas de 5 horas y 7 días son porcentajes de la suscripción, no dinero. Vienen del mismo servicio que el `/usage` de Claude Code y se consultan como máximo una vez por minuto. Las ventanas por modelo, cuando existen, aparecen en el panel de detalles.

Cada sesión muestra la cuenta en la que corre (e-mail y plan). Si tienes varias cuentas, mira [Cuentas de IA y rotación](/docs/ai-accounts).

## Contexto

El porcentaje de contexto es cuánto de la ventana de contexto del modelo ya ocupa la conversación, según el propio Claude Code.
