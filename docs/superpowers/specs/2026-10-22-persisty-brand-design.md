# Persisty: identidade visual e troca de nome

Data: 2026-10-22. Decidido com o usuário nesta conversa.

## Intenção

O produto passa a se chamar **Persisty**: "Persist" não tinha domínio, e o usuário registrou `persisty.app`. Nasce junto uma identidade visual própria, que sai do verde-mar herdado do app e conta a ideia que ele escolheu acima de todas: **o Persisty trabalha sem você**.

## Decisões do usuário

- Nome: Persisty (fácil de pronunciar em português, inglês e espanhol, no estilo de Persist e Verne). Domínio `persisty.app`.
- Símbolo: **Órbita**. Um "p" cujo bojo é uma órbita aberta, com um ponto que gira: o agente trabalhando o dia inteiro.
- Cor da marca: **lima** `#C6F24E`, sobre o grafite que o app e o site já usam. Substitui o verde-mar `#5cc8b0` em tudo.
- Entregas, todas aprovadas ("pode fazer tudo, inclusive no app"):
  1. Arquivos do logo em SVG e PNG (símbolo, símbolo com nome; fundo escuro, fundo claro, uma cor).
  2. Ícone do app (macOS, Windows, Linux) e favicon.
  3. Página curta de guia da marca.
  4. Site com o nome, a cor e o logo novos.
  5. App com ícone, nome e cor novos.

## Regras de construção

- Símbolo em grade de 64: haste 9 × 36 com cantos 4,5 em (13, 19); anel de raio 12 e traço 9 centrado em (33,5; 31), aberto em volta do ponto; ponto de raio 5,2 em (42,4; 22,9).
- Fundo escuro: haste e anel `#F4F2EE`, ponto lima `#C6F24E`. Fundo claro: haste e anel `#111318`, ponto `#6E9A00` (o lima some no branco). Uma cor: tudo branco ou tudo preto, ponto incluído.
- Nome escrito: "persisty", minúsculas, Mona Sans peso 640 e largura 110, espaçamento −0,025 em. Nos arquivos, o nome sai em curvas, sem depender da fonte instalada.
- Ícone do app: o símbolo claro sobre `#1A1D24`, no quadrado arredondado do macOS (grade de 1024 com margem de 100).
- Movimento: o ponto gira devagar no site e para quando a pessoa pede menos movimento no sistema.
- Cores derivadas do lima: realce `#DDF98F` (foco e hover), fundo de destaque `rgba(198, 242, 78, 0.12)`, seleção `rgba(198, 242, 78, 0.24)`. Texto sobre botão lima: `#0f1115`. Tema claro do app: `#4D7300` (5,4:1 no branco).

## O que não muda (dados e compatibilidade)

O identificador do app (`app.persist.desktop`) e, portanto, a pasta de dados, o item "Persist Cloud" do Keychain, os nomes de crates e pacotes, as variáveis `PERSIST_*`, o socket, `~/.persist/worktrees`, `refs/persist/checkpoints` e o prefixo de branch `persist/<nome>`. Renomear qualquer um desses faria quem já usa o app perder sessões, login ou pontos de restauração. O nome do repositório e o projeto da Vercel também ficam.

## Fora do escopo

Animação do ponto dentro do app (o app não mostra o próprio logo na interface); ícone animado no Dock; compra do `persisty.com`.
