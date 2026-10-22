# Site do Persist: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Site do Persist em Next.js, em três idiomas, com Home, Preços, Download, Docs, Changelog, conta no Persist Cloud e páginas de confiança, publicado na Vercel.

**Architecture:** App Router com `next-intl` (`[locale]`, pt-BR sem prefixo), páginas estáticas; Docs e Changelog em Markdown lidos no build; conta como componentes de cliente com `@supabase/ssr` contra o projeto `ytmpopebhdtnucdznfsz`. Mockups do app em HTML/CSS, fiéis à interface real.

**Tech Stack:** Next.js 16, React 19, next-intl 4, @supabase/ssr + supabase-js, unified/remark/rehype + shiki, lucide-react, CSS Modules, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-21-landing-page-design.md` e `PRODUCT.md`.

## Global Constraints

- Locales: `pt-BR` (padrão, sem prefixo), `en`, `es`; slugs em inglês nos três.
- Preços: Pro `US$ 9,90`/mês; Team `US$ 19,90` por usuário/mês; Enterprise sob consulta; sem preço anual.
- Botões "Assinar" chamam `subscribe(plan)` que não faz nada.
- `NEXT_PUBLIC_CONTACT_EMAIL` vazio ⇒ "Fale com a gente" vai para `/sign-in?next=/account&interest=enterprise`.
- Nada de depoimento, logo, contagem ou benchmark; cada recurso com rótulo Disponível / Em desenvolvimento / Planejado.
- Sem rótulo acima de título, sem grade de cartões com ícone, sem texto em gradiente, sem emoji como ícone.
- Animações respeitam `prefers-reduced-motion`.

## Review Focus

- Navegador em `es-AR` ou `en-GB` abrindo `/` vai para `/es` ou `/en`; escolha salva no cookie `NEXT_LOCALE` vence o navegador. (Task 1)
- Código colado com espaços ou hífen (`1234 5678`, `1234-5678`) é aceito. (Task 6)
- `/account` sem sessão leva a `/sign-in?next=/account`. (Task 6)
- Supabase recusando por limite (`over_email_send_rate_limit`, 429) mostra mensagem que diz o problema e o que fazer. (Task 6)
- Slug de doc inexistente devolve 404 no idioma da página. (Task 7)

---

### Task 1: Esqueleto, idiomas e testes

**Files:** `package.json`, `next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `src/i18n/{routing,request,navigation}.ts`, `src/proxy.ts`, `messages/{pt-BR,en,es}.json`, `src/app/[locale]/layout.tsx`, `tests/messages.test.ts`

**Interfaces — Produces:** `routing` (`locales`, `defaultLocale`), `Link`, `useRouter`, `usePathname`, `getPathname` de `src/i18n/navigation.ts`; `type Locale = 'pt-BR' | 'en' | 'es'`.

- [ ] Teste `tests/messages.test.ts`: as três mensagens têm exatamente o mesmo conjunto de chaves e nenhum valor vazio.
- [ ] Rodar `pnpm test` e ver falhar; criar mensagens e config; ver passar.
- [ ] `pnpm build` gera `/`, `/en`, `/es`.
- [ ] Commit.

### Task 2: Mundo visual e moldura do site

**Files:** `src/styles/{tokens,globals}.css`, `src/components/site/{Nav,Footer,LocaleSwitcher,Button,Badge,SectionHead,Faq}.tsx` + `.module.css`, `public/app-icon.png`

**Interfaces — Produces:** `<Button href variant="primary|secondary|ghost">`, `<Badge status="available|in-development|planned|pro">`, `<SectionHead title body link?>`, `<Faq items>`.

- [ ] Tokens do app copiados com a origem anotada; Mona Sans e JetBrains Mono por `next/font/google`; seleção, foco, scrollbar e cursor temados.
- [ ] Commit.

### Task 3: Dados de planos, preço e sistema

**Files:** `src/lib/{plans,pricing,platform,site}.ts`, `tests/{pricing,platform}.test.ts`

**Interfaces — Produces:** `formatPrice(locale: Locale, cents: number): string`; `detectPlatform(ua: string, platform?: string): 'mac' | 'windows' | 'linux' | 'other'`; `PLANS: Plan[]`; `subscribe(plan: PlanId): void`; `contactHref(): string`.

- [ ] Testes: `formatPrice('pt-BR', 990)` → `US$ 9,90`; `formatPrice('en', 990)` → `$9.90`; `formatPrice('es', 1990)` → `US$ 19,90`; UA de Mac, Windows, Linux, iPhone (→ `other`) e Android (→ `other`).
- [ ] Ver falhar, implementar, ver passar, commit.

### Task 4: Mockups do app

**Files:** `src/components/mockups/*` (janela, barra superior, rail, cabeçalho da sessão, terminal, faixa de workspaces, barra de status, painel de contas, abas Pro, registro de rede, demonstração de travamento)

- [ ] Componentes recebem textos por props vindas das mensagens; estados animados param com movimento reduzido.
- [ ] Commit.

### Task 5: Home, Preços e Download

**Files:** `src/app/[locale]/{page,pricing/page,download/page}.tsx`, `src/components/home/*`, `src/components/pricing/*`, `src/components/download/*`

- [ ] Home na ordem da spec; Preços com cartões e tabela comparativa; Download com sistema detectado e "Avise-me".
- [ ] Commit.

### Task 6: Conta

**Files:** `src/lib/{auth,supabase}.ts`, `src/app/[locale]/{sign-in,account}/page.tsx`, `src/components/account/*`, `tests/auth.test.ts`

**Interfaces — Produces:** `normalizeCode(raw: string): string`; `isValidEmail(s: string): boolean`; `isValidCode(s: string): boolean` (6 a 10 dígitos); `safeNext(next: string | null): string` (só caminhos internos); `authErrorKey(err): 'rateLimited' | 'invalidCode' | 'expired' | 'network' | 'unknown'`.

- [ ] Testes: `normalizeCode('1234 5678')` → `12345678`; `normalizeCode('1234-5678')` → `12345678`; `safeNext('https://evil.com')` → `/account`; `safeNext('//evil.com')` → `/account`; `safeNext('/download')` → `/download`; `authErrorKey({ code: 'over_email_send_rate_limit' })` → `rateLimited`; `authErrorKey({ code: 'otp_expired' })` → `expired`.
- [ ] Ver falhar, implementar, ver passar.
- [ ] Entrar (e-mail → código), Minha conta (plano via `my_entitlement`, aparelhos, avise-me e interesses em `user_metadata`, assinar sem ação, sair).
- [ ] Commit.

### Task 7: Docs e Changelog

**Files:** `src/lib/content.ts`, `src/app/[locale]/docs/[[...slug]]/page.tsx`, `src/app/[locale]/changelog/page.tsx`, `src/app/[locale]/changelog/rss.xml/route.ts`, `content/{docs,changelog}/<locale>/*.md`, `tests/content.test.ts`

**Interfaces — Produces:** `listDocs(locale): DocMeta[]`, `getDoc(locale, slug): Promise<Doc | null>`, `listChangelog(locale): Promise<Entry[]>`.

- [ ] Testes: os três idiomas têm os mesmos slugs de docs e as mesmas entradas de changelog; toda doc tem `title`, `description` e `order`; toda entrada tem `date` ISO; `getDoc('en', 'nope')` → `null`.
- [ ] Ver falhar, implementar, escrever conteúdo pt-BR, traduzir en/es, ver passar, commit.

### Task 8: Confiança e SEO

**Files:** `src/app/[locale]/{privacy,security,terms}/page.tsx`, `src/app/{sitemap,robots}.ts`, `src/app/[locale]/opengraph-image.tsx`

- [ ] Metadados por idioma com `alternates.languages`; sitemap com as três versões de cada página.
- [ ] Commit.

### Task 9: Verificação, acabamento e publicação

- [ ] `pnpm test`, `pnpm lint`, `pnpm build` verdes.
- [ ] Capturas desktop (1440) e mobile (390) em `.impeccable/review/`; detector do impeccable; revisor de acabamento; DESIGN.md pelo documentador.
- [ ] Push para `abalad/persist-landingpage`; projeto `persist-landingpage` na Vercel (MW Tecnologia) com as variáveis; deploy de produção; conferir as rotas no ar.
