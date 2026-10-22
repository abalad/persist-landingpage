---
title: Contas de IA e rodízio
description: Conecte várias contas do Claude Code, acompanhe a quota de cada uma ao vivo e deixe o Persisty escolher a conta de cada sessão nova.
group: work
order: 1
---

Em **Configurações › Contas de IA** ficam as contas do Claude Code deste computador: a que já estava logada e as que você conectar pelo Persisty. Cada uma mostra organização, plano e as janelas de **5 horas** e **7 dias**.

## Conectar uma conta

1. Em Contas de IA, clique em **Conectar conta**.
2. O Persisty roda o login do próprio Claude Code (`claude auth login`) para uma pasta só daquela conta, e o navegador abre.
3. Conclua o login no navegador. A conta aparece sozinha. Se o navegador não conseguir voltar ao app, cole o código que ele mostrar.

O Persisty nunca vê a sua senha nem guarda a credencial: quem guarda é o Claude Code. Ajustes, instruções, agentes, comandos e skills são compartilhados com a conta deste computador; login e histórico, nunca.

Para tirar uma conta, use **Desconectar**: o Persisty roda o logout do Claude Code e apaga a pasta daquela conta.

## Quota ao vivo

As barras de 5 h e 7 d vêm do mesmo lugar que o `/usage` do Claude Code, com a credencial que ele já guarda na máquina. O Persisty consulta no máximo uma vez por minuto por conta (o serviço recusa consultas mais frequentes) e mantém os últimos números na tela entre uma consulta e outra.

## Rodízio (Pro)

Com o **rodízio entre contas** ligado, cada sessão nova do Claude Code vai para a conta com mais folga na janela de 5 horas. Contas com 90% ou mais ficam de fora até renovar. O formulário de nova sessão ganha a opção **Automática**.

O rodízio escolhe a conta quando a sessão é criada. Uma sessão já aberta não muda de conta sozinha quando a quota acaba; para continuar sem você, use a [fila de pedidos](/docs/pro#fila-de-pedidos), que espera a janela renovar.

## Sobre usar várias contas

O Persisty não cria contas nem mexe em limites. Ele usa as contas que você já tem, como a pessoal e a da empresa, com o login do próprio Claude Code. Seguir os termos de cada conta continua com você.
