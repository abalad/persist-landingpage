---
title: Recursos do Pro
description: Fila de pedidos, pontos de restauração, verificação ao terminar e pasta própria por sessão, os recursos que deixam o agente trabalhar sem você.
group: work
order: 2
---

Os recursos do Pro ficam no **painel lateral da sessão** (<kbd>⌘</kbd> <kbd>&#92;</kbd>) e no cabeçalho dela. Eles exigem a conta do Persist com o plano Pro; o que já foi gravado continua utilizável se o plano acabar.

## Fila de pedidos

Escreva o próximo pedido agora e escolha quando ele vai para o agente:

- **assim que o agente ficar livre**;
- **quando a janela de 5 h renovar**, com o horário lido da quota ao vivo;
- **a partir de um horário**.

Os pedidos vão um por vez, na ordem da fila, e só quando o agente está esperando o próximo pedido; nunca no meio de um trabalho nem por cima de um pedido de permissão. Cada pedido vai como uma colagem só, então quebras de linha não mandam pedaços.

A fila é conferida a cada 10 segundos com o Persist aberto. Com o app fechado, nada é enviado.

## Pontos de restauração

Cada pedido a um agente grava o estado da pasta da sessão antes de ele começar, com a primeira linha do pedido como nome. Na aba **Pontos de restauração** você vê o que voltaria e o que seria apagado antes de confirmar. Restaurar guarda o estado de agora como um ponto novo, para você poder desfazer.

- Funciona em pastas git e com agentes que avisam o pedido por hook (Claude Code).
- Guarda arquivos rastreados e novos; o que o `.gitignore` ignora fica de fora.
- Branch, HEAD e índice do git não mudam; commits feitos pelo agente não são desfeitos.
- Os pontos ficam como commits em `refs/persist/checkpoints/`, que um `git push` comum não envia. São 50 por sessão.

## Verificar ao terminar

Escolha um comando do workspace (por exemplo `pnpm test`) em **Verificar ao terminar com…**. Quando o agente para depois de mudar arquivos, o comando roda sozinho na pasta da sessão, e o cabeçalho diz se passou, falhou (com o código de saída) ou ainda está rodando.

Vale para sessões de agente dentro de um workspace. O resultado não é enviado ao agente.

## Pasta própria por sessão

Em pastas git, a sessão nova pode ganhar um branch `persist/<nome>` numa pasta só dela (um git worktree), para dois agentes nunca editarem os mesmos arquivos.

- A pasta fica em `~/.persist/worktrees` e não traz o que o git ignora (`node_modules`, `.env`, builds).
- Ao fechar a sessão, o Persist pergunta se a pasta fica, sai, ou sai descartando os arquivos não commitados, e diz quantos commits o branch guarda.
- O branch nunca é apagado.
