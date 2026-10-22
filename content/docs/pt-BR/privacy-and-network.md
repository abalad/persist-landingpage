---
title: Privacidade e registro de rede
description: O que fica na sua máquina, o que vai para fora, e como conferir cada chamada de rede do Persist.
group: account
order: 2
---

O Persist é local: projetos, sessões, histórico, notas e uso ficam num banco SQLite na sua máquina. Não há telemetria.

## O que nunca sai

Código, saída de terminal e prompts nunca saem da sua máquina pelo Persist. Os agentes falam com os provedores deles como fariam sem o Persist.

## O que sai, e por quê

O app só fala com fora para:

- ler a quota do Claude Code (`api.anthropic.com`), com a credencial que o Claude Code já guarda; o token não é gravado nem registrado;
- entrar na conta do Persist Cloud e renovar a licença.

## Registro de rede

Em **Configurações › Rede**, cada chamada que o app fez desde que abriu aparece com destino, motivo, tamanho, resultado e hora. Cabeçalhos, corpo e parâmetros nunca são mostrados nem guardados. O registro zera ao fechar o app.

Mais detalhes em [Segurança](/security) e na [Política de privacidade](/privacy).
