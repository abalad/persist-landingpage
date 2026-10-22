---
title: Editor, cambios y notas
description: El editor junto a la terminal, la pestaña de cambios de git, la búsqueda en el proyecto y las notas.
group: work
order: 3
---

El panel lateral de la sesión (<kbd>⌘</kbd> <kbd>&#92;</kbd>) reúne lo que necesitas para revisar el trabajo del agente sin salir de ahí. Una fila de íconos alterna entre **Cambios** (*Changes*), **Código** (*Code*), **Búsqueda** (*Search*), **Notas** (*Notes*) y **Detalles** (*Details*). El divisor entre la terminal y el panel se puede arrastrar.

## Código

El editor abre la carpeta de la sesión, en árbol. Los archivos que git ignora aparecen atenuados.

- <kbd>⌘</kbd> <kbd>P</kbd> abre un archivo por su nombre; <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>F</kbd> busca en todos los archivos; <kbd>⌘</kbd> <kbd>F</kbd> busca y reemplaza en el archivo abierto; <kbd>⌘</kbd> <kbd>S</kbd> guarda.
- Resaltado por lenguaje, cargado bajo demanda, con el mismo tema de la terminal.
- Marcas de git en el margen y diff contra el HEAD.
- Si el archivo cambia en el disco (el agente lo editó), Persist avisa: recargar (*Reload*) o mantener tu versión (*Keep mine*). Las pestañas sin cambios se recargan solas.

No hay autocompletado inteligente ni "ir a la definición". Los archivos binarios y los de más de 5 MB no se abren.

## Cambios

La pestaña **Cambios** (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>G</kbd>) muestra los archivos modificados con las letras de estado de git. Prepara o quita archivos uno por uno o todos a la vez, escribe el mensaje y haz el commit con <kbd>⌘</kbd> <kbd>↵</kbd>, o usa **Commit y enviar** (*Commit and push*). El historial muestra lo que todavía no se envió y los archivos de cada commit.

Descartar cambios y resolver conflictos se hace en la terminal de al lado. Si git pide contraseña para enviar, Persist muestra el rechazo tal como lo escribió git.

## Notas

Cada proyecto tiene notas en markdown, que se guardan solas en la base de datos local de Persist.
