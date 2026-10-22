---
title: Sessões e recuperação
description: O que sobrevive a fechar o Persist, a um travamento do app e a um reinício do computador, e como o Persist diz o que não voltou.
group: start
order: 3
---

A janela do Persist nunca é dona dos seus processos. Cada terminal roda num supervisor separado (um tmux embutido no macOS e no Linux, um supervisor próprio no Windows), e a janela só se conecta a ele. É isso que permite fechar ou perder a janela sem perder trabalho.

## Fechar ou travar o app

Se você fecha o Persist, ou se ele trava, as sessões continuam rodando no supervisor. Ao abrir de novo, o app reconcilia o que está guardado com o que está vivo e **reanexa** cada terminal, com as últimas linhas do histórico.

Nada precisa ser relançado nesse caso: o agente não percebe que a janela sumiu.

## Reiniciar ou travar o computador

Depois de um reinício, **nenhum processo sobrevive**, em nenhum app. O que o Persist faz é relançar cada sessão a partir do que guardou sobre ela: pasta, comando, agente e o id da conversa.

- Sessões do **Claude Code** voltam com `claude --resume` na mesma conversa. Quando o próprio Claude Code confirma a retomada, o relatório diz **Agente retomado**.
- Sessões do **Codex** são relançadas, mas a retomada ainda não é confirmada; o relatório diz isso.
- **Terminais** com um comando inicial (por exemplo `pnpm dev`) são relançados com o mesmo comando.

## Quando relançar

Cada sessão tem uma regra, escolhida ao criá-la:

| Regra | O que acontece depois de um reinício |
| --- | --- |
| Relançar se tiver caído | Relança quando você abre o Persist. É o padrão. |
| Só reanexar se estiver viva | Não relança sozinho; espera você pedir. |
| Relançar sempre | Relança sempre que a sessão puder voltar, inclusive depois de encerrar com erro. |

Para relançar na hora o que ficou para trás, use **Restaurar tudo** (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>R</kbd>). Rodar duas vezes não duplica sessões.

## O relatório de restauração

Toda restauração termina num relatório com uma linha por sessão: reanexada, relançada, agente retomado, ignorada ou falhou, com o motivo quando houver. O resumo diz quantas voltaram, quantas falharam e quantas foram ignoradas.

O Persist nunca diz que uma sessão voltou sem ter voltado. "Agente retomado" sem confirmação quer dizer só que o comando de retomada foi executado.

## Histórico do terminal

Ao reanexar, as últimas 5 000 linhas acima da tela aparecem no terminal antes do conteúdo ao vivo. O supervisor guarda até 20 000 linhas por sessão.
