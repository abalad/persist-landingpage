---
title: Agentes e estados
description: Como o Persisty reconhece o Claude Code e o Codex e mostra quem está trabalhando, quem espera você e quem pede permissão.
group: start
order: 4
---

O Persisty reconhece agentes de duas formas: quando você abre a sessão como Claude Code ou Codex, e quando você digita `claude` num terminal comum aberto pelo Persisty. Nos dois casos a sessão ganha o ícone do agente, o estado e o custo.

## Os estados

| Estado | Quer dizer |
| --- | --- |
| Trabalhando | O agente recebeu um pedido e ainda não terminou. |
| Aguardando você | Terminou o turno e espera o próximo pedido. |
| Permissão pendente | Quer rodar algo e espera o seu "sim" no terminal. |
| Ocioso | Aberto, sem pedido em andamento. |
| Encerrada | A conversa terminou. |

Os estados aparecem na aba, no cartão do workspace, na barra de projetos e na lista de agentes. Eles sempre vêm com ícone e palavra, nunca só com cor.

## De onde vem o estado

No Claude Code, o estado vem dos **hooks** do próprio Claude: eventos que ele dispara ao começar, ao receber um pedido, ao parar e ao pedir permissão. O Persisty injeta esses hooks em cada sessão com `--settings`, num arquivo só dele. O seu `~/.claude/settings.json` nunca é alterado.

Se o Claude Code mostrar o aviso de confiança da pasta ("Yes, I trust this folder"), ele aparece antes de qualquer hook. O Persisty não pula esse aviso: o estado fica desconhecido até você responder no terminal.

## Codex

O Codex abre e persiste como qualquer sessão. Os hooks dele precisam ser aprovados por você dentro do próprio Codex (`/hooks`). Sem essa aprovação, o estado fica desconhecido. A retomada depois de um reinício ainda não foi confirmada, e o Persisty marca isso.

## Modelo por sessão

O rodapé da sessão tem um seletor de modelo. A escolha fica guardada e é passada com `--model` em cada lançamento e retomada. Numa sessão já aberta, o Persisty digita `/model` por você.
