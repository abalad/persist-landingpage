---
version: 1
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: ["src/components/site"]
---

## Scope

Home page of the Persist website (`src/app/[locale]/page.tsx`) and the shared chrome (nav, footer) every route inherits. Visitor mode: Persuade. Pricing and Download are Persuade too; Docs and Changelog are Read and inherit the world without the theatre.

## Audience, job, action

Developers who run Claude Code and Codex all day across several products and accounts; companies who pay for those accounts. Job: decide in seconds whether Persist solves crashes, disorder and account juggling. Action: download (notify while no public build) or create an account; companies talk to us.

## Proof and constraints

Proof is the product itself rendered in HTML at full fidelity, using the app's real vocabulary and layout. Demo projects are fictional (Rota, Quintal, Bússola). No testimonials, logos, counts or benchmarks exist. Availability labels: Available / In development / Planned.

## Direction contract

THESIS: The page is the product running. A faithful, live HTML rendition of Persist's own window carries every claim; it refuses the category default of gradient hero, icon-card feature grid and logo wall.

OWN-WORLD: The app's graphite (#0f1115 ground, #151821 surfaces, #262b37 hairlines), one sea-green (#5cc8b0) reserved for alive and action, status hues (blue working, amber waiting, green idle) always with icon and word. Mona Sans light at display sizes, regular in UI; JetBrains Mono only inside terminals and code. Window frames: 1px hairline, 10px radius, soft offset shadow. Pills: off-white primary, graphite secondary.

STORY: The visitor understands Persist keeps agents alive, organised by project, and working across accounts; believes it by watching it recover from a simulated crash and route a session to the roomiest account; downloads or creates an account. Companies read an honest roadmap and talk to us.

FIRST VIEWPORT: Nav 64px. Centred app icon 72px. Headline in two lines around 64px, light. One sentence naming the three pains. Two pills: download for the detected OS, create free account. Under them, at about 86% width, the app window begins above the fold, agents changing state and the status bar's 5h and 7d bars live. Signature interaction: "Simulate a crash" collapses the window to black, Persist reopens and sessions return one by one with their resume command; reduced motion swaps states instantly.

FORM: Brief-pinned structure (verne.build: centred statement, product window, two-column section heads over mockups) inside the app's established world; no concept seed rolled because a pinned direction beats the roll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

Contact e-mail (env var, empty). Public download (no signed build). Stripe (buttons without action).
