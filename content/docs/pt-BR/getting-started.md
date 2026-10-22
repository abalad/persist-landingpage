---
title: Primeiros passos
description: O que é o Persisty, como instalar e como abrir o primeiro projeto com uma sessão de agente.
group: start
order: 1
---

O Persisty é um app de desktop para quem mantém vários produtos de software e trabalha com agentes de IA no terminal, como o Claude Code e o Codex. Ele organiza os terminais por projeto, acompanha o estado e a quota de cada agente e traz as sessões de volta depois de um travamento.

Nada do que você faz no Persisty depende de conta ou de internet. A conta só existe para os planos pagos.

## Instalar

1. Baixe o build do seu sistema na [página de download](/download). Enquanto não houver build público, marque "Avise-me" para receber o aviso.
2. Abra o Persisty. Tudo de que ele precisa já vem dentro do app; não é preciso instalar nenhuma outra dependência.
3. Para usar agentes, tenha o [Claude Code](https://docs.claude.com/en/docs/claude-code) instalado e com login feito. Terminais comuns funcionam sem ele.

## Criar o primeiro projeto

Um **projeto** é um produto ou cliente seu, não uma pasta. Dentro dele ficam os **workspaces**: as pastas e repositórios daquele produto.

1. Clique no **+** da barra de projetos, à esquerda, e dê um nome.
2. Arraste uma pasta do Finder para a área indicada, ou clique e escolha. Ela vira o primeiro workspace. Se for um repositório git, o Persisty mostra o branch e as alterações.
3. Repita para os outros repositórios do mesmo produto (API, app, site).

## Abrir uma sessão

Com o workspace selecionado, aperte <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>N</kbd> e escolha o que abrir:

- **Claude Code** ou **Codex**, para uma sessão de agente;
- **Terminal**, para um shell comum (servidor de desenvolvimento, testes, o que quiser).

A sessão aparece como aba no topo e como linha no cartão do workspace, embaixo. O estado do agente aparece na aba: trabalhando, aguardando você, pedindo permissão ou parado.

## Próximos passos

- [Projetos e workspaces](/docs/projects-and-workspaces): como o Persisty organiza o trabalho.
- [Sessões e recuperação](/docs/sessions-and-recovery): o que acontece depois de um travamento ou de um reinício.
- [Agentes e estados](/docs/agents): como saber qual agente precisa de você.
