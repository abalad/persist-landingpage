---
title: Uso, custo e quota
description: Gasto por sessão, contexto usado e as janelas de 5 horas e 7 dias, com o que cada número quer dizer.
group: work
order: 4
---

O rodapé de cada sessão de agente mostra o modelo, o gasto, o contexto usado e as janelas de 5 h e 7 d. O painel **Detalhes** (<kbd>⌘</kbd> <kbd>I</kbd>) e **Configurações › Uso de IA** juntam esses números por projeto, modelo e dia.

## Gasto

O gasto vem dos registros locais do Claude Code e da status line que ele mesmo calcula. Estimativas por tokens usam preço de lista com data e origem, e **não são a fatura** do provedor.

## Quota

As janelas de 5 horas e 7 dias são percentuais da assinatura, não dinheiro. Elas vêm do mesmo serviço que o `/usage` do Claude Code e são consultadas no máximo uma vez por minuto. Janelas por modelo, quando existem, aparecem no painel de detalhes.

Cada sessão mostra a conta em que roda (e-mail e plano). Se você tiver várias contas, veja [Contas de IA e rodízio](/docs/ai-accounts).

## Contexto

A porcentagem de contexto é quanto da janela de contexto do modelo a conversa já ocupa, segundo o próprio Claude Code.
