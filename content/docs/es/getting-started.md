---
title: Primeros pasos
description: Qué es Persisty, cómo instalarlo y cómo abrir el primer proyecto con una sesión de agente.
group: start
order: 1
---

Persisty es una app de escritorio para quien mantiene varios productos de software y trabaja con agentes de IA en la terminal, como Claude Code y Codex. Organiza las terminales por proyecto, sigue el estado y la cuota de cada agente y trae las sesiones de vuelta después de un cuelgue.

Nada de lo que haces en Persisty depende de una cuenta ni de internet. La cuenta solo existe para los planes pagos.

Por ahora, la interfaz de la app está en portugués y en inglés. Por eso esta documentación da entre paréntesis el nombre en inglés de cada menú, botón y pestaña.

## Instalar

1. Descarga el build de tu sistema en la [página de descarga](/download). Mientras no haya un build público, marca "Avísame" para recibir el aviso.
2. Abre Persisty. Todo lo que necesita ya viene dentro de la app; no hace falta instalar ninguna otra dependencia.
3. Para usar agentes, ten [Claude Code](https://docs.claude.com/en/docs/claude-code) instalado y con el login hecho. Las terminales comunes funcionan sin él.

## Crear el primer proyecto

Un **proyecto** es un producto o un cliente tuyo, no una carpeta. Dentro de él están los **workspaces**: las carpetas y los repositorios de ese producto.

1. Haz clic en el **+** de la barra de proyectos, a la izquierda, y ponle un nombre.
2. Arrastra una carpeta del Finder al área indicada, o haz clic y elígela. Se convierte en el primer workspace. Si es un repositorio git, Persisty muestra la rama y los cambios.
3. Repite para los otros repositorios del mismo producto (API, app, sitio).

## Abrir una sesión

Con el workspace seleccionado, presiona <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>N</kbd> y elige qué abrir:

- **Claude Code** o **Codex**, para una sesión de agente;
- **Terminal**, para un shell común (servidor de desarrollo, pruebas, lo que quieras).

La sesión aparece como pestaña arriba y como línea en la tarjeta del workspace, abajo. El estado del agente aparece en la pestaña: trabajando, esperándote, pidiendo permiso o detenido.

## Próximos pasos

- [Proyectos y workspaces](/docs/projects-and-workspaces): cómo organiza Persisty el trabajo.
- [Sesiones y recuperación](/docs/sessions-and-recovery): qué pasa después de un cuelgue o de un reinicio.
- [Agentes y estados](/docs/agents): cómo saber qué agente te necesita.
