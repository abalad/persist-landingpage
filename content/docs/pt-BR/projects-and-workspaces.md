---
title: Projetos e workspaces
description: Como o Persisty organiza produtos, pastas, sessões e agentes numa só janela.
group: start
order: 2
---

O Persisty organiza o trabalho em três níveis, do maior para o menor.

| Nível | O que é | Onde aparece |
| --- | --- | --- |
| Projeto | Um produto, cliente ou negócio seu | Barra de projetos, à esquerda |
| Workspace | Uma pasta daquele projeto, com ou sem git | Cartões na faixa de baixo |
| Sessão | Um terminal: um agente ou um shell | Abas no topo |

## Barra de projetos

Cada projeto é um bloco com a inicial do nome. Um ponto colorido avisa quando algo ali precisa de você: amarelo para um agente esperando resposta ou pedindo permissão, azul para trabalho em andamento.

Aperte <kbd>⌘</kbd> <kbd>B</kbd> para expandir a barra. Expandida, ela mostra o nome e o estado de cada projeto e a lista de **agentes**, com o estado e o workspace de cada um. O filtro alterna entre os agentes do projeto atual e os de todos.

Troque de projeto com <kbd>⌘</kbd> <kbd>1</kbd> a <kbd>⌘</kbd> <kbd>9</kbd>.

## Workspaces

Cada cartão da faixa de baixo é uma pasta do projeto. Quando a pasta é um repositório git, o cartão mostra o branch e quantos arquivos mudaram. Dentro do cartão ficam as sessões daquele workspace, cada uma com o estado em palavras.

O cartão **Avulsas** guarda sessões que não pertencem a nenhum workspace. <kbd>⌘</kbd> <kbd>J</kbd> recolhe a faixa em ícones quando você quer mais espaço para o terminal.

## Sessões

As abas do topo são as sessões do workspace selecionado. O **+** abre um terminal novo ali mesmo; <kbd>⌘</kbd> <kbd>←</kbd> e <kbd>⌘</kbd> <kbd>→</kbd> passam para a sessão anterior ou a próxima.

O cabeçalho da sessão mostra o nome, o estado e o branch da pasta. O branch acompanha trocas feitas pelo terminal, e clicar nele abre um seletor com busca para trocar ou criar branches.

## Comandos do workspace

Comandos que você roda sempre (o servidor de desenvolvimento, os testes, o build) podem ser guardados no workspace. Cada execução vira uma aba na gaveta de comandos, com o estado escrito: rodando, terminou, parado. Parar um comando manda Ctrl-C como no terminal e mantém a saída.
