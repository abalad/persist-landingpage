---
title: Proyectos y workspaces
description: Cómo organiza Persist productos, carpetas, sesiones y agentes en una sola ventana.
group: start
order: 2
---

Persist organiza el trabajo en tres niveles, del mayor al menor.

| Nivel | Qué es | Dónde aparece |
| --- | --- | --- |
| Proyecto | Un producto, cliente o negocio tuyo | Barra de proyectos, a la izquierda |
| Workspace | Una carpeta de ese proyecto, con o sin git | Tarjetas en la franja de abajo |
| Sesión | Una terminal: un agente o un shell | Pestañas arriba |

## Barra de proyectos

Cada proyecto es un bloque con la inicial del nombre. Un punto de color avisa cuando algo ahí te necesita: amarillo para un agente que espera respuesta o pide permiso, azul para trabajo en curso.

Presiona <kbd>⌘</kbd> <kbd>B</kbd> para expandir la barra. Expandida, muestra el nombre y el estado de cada proyecto y la lista de **agentes**, con el estado y el workspace de cada uno. El filtro alterna entre los agentes del proyecto actual y los de todos.

Cambia de proyecto con <kbd>⌘</kbd> <kbd>1</kbd> a <kbd>⌘</kbd> <kbd>9</kbd>.

## Workspaces

Cada tarjeta de la franja de abajo es una carpeta del proyecto. Cuando la carpeta es un repositorio git, la tarjeta muestra la rama y cuántos archivos cambiaron. Dentro de la tarjeta están las sesiones de ese workspace, cada una con su estado en palabras.

La tarjeta **Sueltas** (*Standalone*) guarda las sesiones que no pertenecen a ningún workspace. <kbd>⌘</kbd> <kbd>J</kbd> contrae la franja a íconos cuando quieres más espacio para la terminal.

## Sesiones

Las pestañas de arriba son las sesiones del workspace seleccionado. El **+** abre una terminal nueva ahí mismo; <kbd>⌘</kbd> <kbd>←</kbd> y <kbd>⌘</kbd> <kbd>→</kbd> pasan a la sesión anterior o a la siguiente.

El encabezado de la sesión muestra el nombre, el estado y la rama de la carpeta. La rama sigue los cambios hechos desde la terminal, y al hacer clic en ella se abre un selector con búsqueda para cambiar de rama o crear una.

## Comandos del workspace

Los comandos que corres siempre (el servidor de desarrollo, las pruebas, el build) se pueden guardar en el workspace. Cada ejecución se vuelve una pestaña en el cajón de comandos, con el estado escrito: ejecutando, terminó, detenido. Detener un comando envía Ctrl-C como en la terminal y conserva la salida.
