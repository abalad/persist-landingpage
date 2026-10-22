---
title: Supervisor embutido e builds para Windows e Linux
date: 2026-10-21
---

- O tmux que mantém as sessões vivas agora vai **dentro do app** no macOS e no Linux. Não é mais preciso instalar nada à parte.
- No Windows, um supervisor próprio (`persist-supervisord`) faz o mesmo papel. Os agentes funcionam sem shell POSIX: os hooks do Claude Code chamam um executável nativo.
- Existe um instalador para Windows e pacotes `.deb` e AppImage configurados para Linux. Os dois ainda não foram testados em máquinas reais e vão sair como prévia.
- Corrigido: eventos dos agentes podiam se perder quando uma linha era lida no meio da escrita.
