# Site do Persist: design

Data: 2026-10-21. Fonte de verdade do produto: `PRODUCT.md`.

## Intenção

Um site que explique para que o Persist serve em poucos segundos, venda os planos pagos, colete contas e mantenha a pessoa voltando (Docs, Changelog, aviso de lançamento). O público vai de devs solo a empresas. A espinha da página são as três dores que fizeram o Persist existir: sessões que voltam depois de um travamento, um lugar para cada projeto e contas do Claude Code que se revezam sem a pessoa trocar login.

## Decisões do usuário

- Estilo de referência: verne.build, sem nenhum traço de site feito por IA.
- Idiomas: pt-BR (padrão, sem prefixo), en, es. Detecta o idioma do navegador e permite trocar.
- Planos: Gratuito; Pro US$ 9,90/mês; Team US$ 19,90 por usuário/mês; Enterprise sob consulta. Sem preço anual.
- Botões de assinar existem e por enquanto não fazem nada (o Stripe entra na sequência).
- Download: página pronta com os três sistemas; enquanto não houver build público, o botão vira "Avise-me", que pede a conta.
- Contato: ainda não há e-mail. Fica em variável de ambiente; vazia, "Fale com a gente" leva à criação de conta com interesse em Enterprise marcado nos metadados do usuário.
- Stack: Next.js na Vercel (projeto `persist-landingpage`, conta MW Tecnologia); repositório `abalad/persist-landingpage`.
- Páginas: Home, Preços, Download, Docs, Changelog, Conta (entrar e minha conta), Privacidade, Segurança, Termos.

## Metas, não-metas e anti-metas

Metas: entender o produto no primeiro viewport; prova pela interface real (mockups em HTML fiéis ao app); preço claro; conta criada de verdade no Persist Cloud; Docs que ensinam a usar; Changelog que mostra ritmo.

Não-metas: checkout (Stripe), painel web de time, blog, analytics.

Anti-metas (o site falha mesmo funcionando se): inventar cliente, depoimento, logo, número de downloads ou benchmark; prometer recurso que não existe (troca de conta no meio da sessão, recursos de Team/Enterprise, build público); parecer template de IA (rótulo acima de título, grade de cartões com ícone, texto em gradiente, brilho neon, emoji como ícone, "supercharge", "seamless").

## Estrutura da Home

1. Navegação: logo, Produto, Preços, Docs, Changelog; idioma; Entrar; Download.
2. Primeiro viewport: ícone do app, título, uma frase com as três dores, "Baixar para <sistema detectado>" e "Criar conta grátis", e o mockup grande do app vivo (agentes mudando de estado, terminal escrevendo, janelas de quota).
3. Agentes compatíveis: Claude Code, Codex, qualquer programa de terminal, com o nível de suporte escrito.
4. Seções em duas colunas (título à esquerda, texto e link para a Doc à direita, mockup embaixo):
   - Recuperação depois de travamento, com a interação assinatura "Simular um travamento": a tela do mockup apaga, o app volta e as sessões reaparecem uma a uma com o comando de retomada.
   - Projetos e workspaces.
   - Contas de IA e rodízio (Pro), com as janelas de 5 h e 7 d de cada conta.
   - Estado de cada agente.
   - Trabalho sozinho com rede de proteção (Pro): fila de pedidos, pontos de restauração, verificação ao terminar, pasta própria por sessão, em abas.
   - Editor, alterações do git e notas.
   - Privacidade: registro de rede.
5. Para times e empresas: o que vem, com rótulos Disponível / Em desenvolvimento / Planejado.
6. Planos (resumo) e link para Preços.
7. Perguntas frequentes.
8. Fechamento com as duas ações.
9. Rodapé.

## Conta

- Entrar: e-mail, depois o código que chega por e-mail (o mesmo fluxo do app: `signInWithOtp` com criação de usuário e `verifyOtp` tipo `email`). Aceita `next` para voltar ao ponto de origem.
- Minha conta: e-mail, plano atual (`my_entitlement`), aparelhos, "Avise-me quando o download sair" (metadados do usuário, sem migração), assinar Pro/Team (botão sem ação), interesse em Enterprise, sair.
- Risco conhecido: o SMTP padrão do Supabase só entrega para membros da equipe e 2 e-mails por hora. Precisa de SMTP próprio antes de divulgar.

## Docs e Changelog

Markdown por idioma em `content/<locale>/`, renderizado no build. Docs com navegação lateral e sumário; Changelog em ordem cronológica, com feed RSS por idioma. O conteúdo vem do CHANGELOG.md, LIMITATIONS.md e do código do app; nada além do que o app faz.

## Escolhas minhas (o usuário pode mudar)

- CSS próprio com os tokens do app (sem Tailwind), ícones Lucide como no app.
- Tipografia: Mona Sans (títulos e interface), JetBrains Mono só para terminal e código.
- Slugs em inglês nos três idiomas (`/pricing`, `/en/pricing`, `/es/pricing`).
- Nomes fictícios nos mockups (projetos Rota, Quintal e Bússola), nunca os projetos reais do usuário.
- Testes com Vitest para o que tem regra: chaves de tradução completas nos três idiomas, formatação de preço, detecção de sistema, conteúdo de Docs e Changelog presente nos três idiomas, validação de e-mail e código.
