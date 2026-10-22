# Persisty: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar o nome para Persisty e aplicar a identidade Órbita/lima no kit de marca, no site e no app.

**Architecture:** Os arquivos-mestre da marca são SVG gerados por script a partir das regras de construção da spec (o nome em curvas sai da Mona Sans via fontTools); os PNG saem do SVG com `rsvg-convert`; os ícones do app saem do PNG de 1024 com `tauri icon`.

**Tech Stack:** Python + fontTools, rsvg-convert, Next.js (site), Tauri 2 + React (app).

**Spec:** `docs/superpowers/specs/2026-10-22-persisty-brand-design.md`

## Global Constraints

- Lima `#C6F24E` (escuro), `#6E9A00` (símbolo em fundo claro), `#4D7300` (texto/realce no tema claro do app), realce `#DDF98F`.
- Nada interno muda de nome: `app.persist.desktop`, Keychain "Persist Cloud", crates, `PERSIST_*`, `~/.persist`, `refs/persist`, `persist/<nome>`.
- No app: commits locais, sem push. No site: push em `main` publica.

## Review Focus

- Um texto que ainda diz "Persist" sem o "y" em algum dos três idiomas (Task 2 testa).
- Ícone ilegível a 16 px (Task 1 confere na captura).
- Contraste do lima como texto em fundo claro (Task 5: tema claro do app usa `#4D7300`).
- Instalação por cima do `Persist.app` antigo deixando dois apps na pasta Aplicativos (Task 5).
- Botões lima com texto claro (ilegível): texto sobre lima é sempre escuro (Tasks 2 e 5).

---

### Task 1: Kit de marca
**Files:** `brand/build.py`, `brand/*.svg`, `public/brand/*` (SVG e PNG), `public/app-icon.png`, `src/app/icon.png`, `src/app/apple-icon.png`
- [ ] Gerar símbolo (escuro, claro, branco, preto), nome em curvas, assinaturas horizontais (escura, clara), ícone do app de 1024.
- [ ] Exportar PNG e conferir numa captura os tamanhos 16, 32 e 128.
- [ ] Commit.

### Task 2: Site com o nome e a cor novos
**Files:** `messages/**`, `content/**`, `src/styles/tokens.css`, `src/components/site/Logo.tsx`, `src/app/[locale]/opengraph-image.tsx`, `README.md`, `PRODUCT.md`, `DESIGN.md`, `tests/brand.test.ts`
- [ ] Teste: nenhum texto do site (mensagens e conteúdo, três idiomas) contém `Persist` como palavra solta; os arquivos do kit existem.
- [ ] Ver falhar; renomear; tokens lima; logo com o símbolo (ponto girando, parado com movimento reduzido); OG com o símbolo; ver passar; commit.

### Task 3: Página do kit de marca
**Files:** `src/app/[locale]/brand/page.tsx`, `messages/*/brand.json`, rodapé, sitemap
- [ ] Página com o símbolo, as cores, tamanhos mínimos, o que não fazer e os downloads; commit.

### Task 4: Domínio
- [ ] Adicionar `persisty.app` ao projeto da Vercel e informar os registros de DNS; trocar `NEXT_PUBLIC_SITE_URL` quando o domínio responder.

### Task 5: App
**Files (repo do app):** `packages/design-tokens/tokens.css`, `apps/desktop/src/features/editor/theme.ts`, dois CSS de palco, `apps/desktop/src/i18n/locales/*.json`, `apps/desktop/index.html`, `apps/desktop/src/App.tsx`, `apps/desktop/src-tauri/tauri.conf.json`, `apps/desktop/src-tauri/icons/*`, `crates/persist-agents/src/relay.rs` + teste, `scripts/build/install-macos.sh`, `supabase/templates/sign-in-code.html`, `supabase/config.toml`
- [ ] Teste existente do relay ajustado para "Persisty" (ver falhar antes de trocar a constante).
- [ ] Tokens e cores fixas → lima; textos visíveis → Persisty; nome do app e da janela; ícones via `tauri icon`; instalador remove o `Persist.app` antigo.
- [ ] `pnpm test` e `pnpm lint` do app; commit local.
- [ ] Aplicar o e-mail de acesso no Supabase de produção com `scripts/cloud/push-auth-email.sh`.

### Task 6: Verificação e publicação
- [ ] Testes, lint e build do site; capturas desktop e celular; e2e da conta contra produção; push do site.
