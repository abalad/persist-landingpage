---
title: Editor, alterações e notas
description: O editor ao lado do terminal, a aba de alterações do git, a busca no projeto e as notas.
group: work
order: 3
---

O painel lateral da sessão (<kbd>⌘</kbd> <kbd>\</kbd>) junta o que você precisa para conferir o trabalho do agente sem sair dele. Uma linha de ícones alterna entre **Alterações**, **Código**, **Busca**, **Notas** e **Detalhes**. A divisória entre o terminal e o painel é arrastável.

## Código

O editor abre a pasta da sessão, em árvore. Arquivos ignorados pelo git aparecem esmaecidos.

- <kbd>⌘</kbd> <kbd>P</kbd> abre um arquivo pelo nome; <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>F</kbd> busca em todos os arquivos; <kbd>⌘</kbd> <kbd>F</kbd> busca e substitui no arquivo aberto; <kbd>⌘</kbd> <kbd>S</kbd> salva.
- Destaque por linguagem, carregado sob demanda, no mesmo tema do terminal.
- Marcas do git na margem e diff contra o HEAD.
- Se o arquivo mudar no disco (o agente editou), o Persist avisa: recarregar ou manter a sua versão. Abas sem alteração recarregam sozinhas.

Não há autocompletar inteligente nem "ir para definição". Arquivos binários e acima de 5 MB não abrem.

## Alterações

A aba **Alterações** (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>G</kbd>) mostra os arquivos mudados com as letras de estado do git. Prepare ou remova por arquivo ou tudo, escreva a mensagem e faça o commit com <kbd>⌘</kbd> <kbd>↵</kbd>, ou use **Commit e enviar**. O histórico mostra o que ainda não foi enviado e os arquivos de cada commit.

Descartar alterações e resolver conflitos ficam no terminal ao lado. Se o git pedir senha para enviar, o Persist mostra a recusa como o git escreveu.

## Notas

Cada projeto tem notas em markdown, salvas sozinhas no banco local do Persist.
