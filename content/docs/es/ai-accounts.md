---
title: Cuentas de IA y rotación
description: Conecta varias cuentas de Claude Code, sigue en vivo la cuota de cada una y deja que Persist elija la cuenta de cada sesión nueva.
group: work
order: 1
---

En **Configuración › Cuentas de IA** (*Settings › AI accounts*) están las cuentas de Claude Code de esta computadora: la que ya tenía el login hecho y las que conectes desde Persist. Cada una muestra organización, plan y las ventanas de **5 horas** y **7 días**.

## Conectar una cuenta

1. En Cuentas de IA, haz clic en **Conectar cuenta** (*Connect account*).
2. Persist ejecuta el login del propio Claude Code (`claude auth login`) para una carpeta solo de esa cuenta, y se abre el navegador.
3. Completa el login en el navegador. La cuenta aparece sola. Si el navegador no logra volver a la app, pega el código que te muestre.

Persist nunca ve tu contraseña ni guarda la credencial: quien la guarda es Claude Code. Los ajustes, las instrucciones, los agentes, los comandos y las skills se comparten con la cuenta de esta computadora; el login y el historial, nunca.

Para quitar una cuenta, usa **Desconectar** (*Disconnect*): Persist ejecuta el logout de Claude Code y borra la carpeta de esa cuenta.

## Cuota en vivo

Las barras de 5 h y 7 d vienen del mismo lugar que el `/usage` de Claude Code, con la credencial que Claude Code ya guarda en la máquina. Persist consulta como máximo una vez por minuto por cuenta (el servicio rechaza consultas más frecuentes) y mantiene los últimos números en pantalla entre una consulta y otra.

## Rotación (Pro)

Con la **rotación entre cuentas** (*Rotate between accounts*) activada, cada sesión nueva de Claude Code va a la cuenta con más margen en la ventana de 5 horas. Las cuentas con 90% o más quedan fuera hasta renovarse. El formulario de nueva sesión muestra la opción **Automática** (*Automatic*).

La rotación elige la cuenta cuando se crea la sesión. Una sesión ya abierta no cambia sola de cuenta cuando se acaba la cuota; para seguir sin ti, usa la [cola de pedidos](/docs/pro#cola-de-pedidos), que espera a que la ventana se renueve.

## Sobre usar varias cuentas

Persist no crea cuentas ni toca límites. Usa las cuentas que ya tienes, como la personal y la de la empresa, con el login del propio Claude Code. Cumplir los términos de cada cuenta sigue siendo cosa tuya.
