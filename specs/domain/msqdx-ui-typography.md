# MSQ DX v2 — Typography (product UI)

**Status:** Accepted — 2026-07-28  
**ADR:** 0028 (amended)  
**Implements:** `packages/ui/src/tokens/typography.ts` · `css/tokens.css` · `css/typography.css`  
**Knowledge:** `knowledge/msqdx-ui-typography.md`  
**Catalog:** Storybook → Foundation/Typography · Typography.mdx

## Goals

1. One type scale for ECHON product UI (not thin ops `:8300`).
2. Semantic **roles** over ad-hoc `font-size` / `font-weight` literals in new code.
3. Align with existing product rhythms (hints `0.65rem`, compact controls, light chat display) — not invent a foreign scale.
4. Spec → tokens → CSS → Storybook → tests (no orphaned hex/rem in components).

## Non-goals (this pass)

- Retire every literal in 5k CSS lines (incremental; high-traffic DS components first: Button, Text utilities).
- Load Forest faces (Bricolage / Plex Sans) — forest remains incomplete font-wise.
- Adopt `@msqdx/react` typography components.

## Faces (stacks)

| Token | Stack | Use |
|-------|--------|-----|
| `--stack-display` → `--font-display` | Noto Sans JP → Noto Sans → system-ui | Titles / hero |
| `--stack-body` → `--font-body` | same | Default UI, buttons, body |
| `--stack-mono` → `--font-mono` | IBM Plex Mono → ui-monospace | Hints, indices, click-paths |

(`--type-*` is reserved for **size** steps only.)

Google Fonts import (entry CSS) must include weights used below: **200, 300, 400, 500, 700** (Noto) and **400, 500, 600** (Plex Mono).

## Size steps (`--type-*`)

| Step | rem | Role |
|------|-----|------|
| `2xs` | `0.62rem` | Ultra meta (secondary mono crumbs) |
| `xs` | `0.65rem` | **Hints** (ADR 0028), mono click-paths, rank index |
| `sm` | `0.72rem` | Eyebrows, chip labels, Button `sm` |
| `md` | `0.78rem` | Default controls — Button `md` |
| `lg` | `0.88rem` | Compact body / rank labels / Button `lg` |
| `xl` | `1rem` | Standard body prose |
| `2xl` | `1.15rem` | Section / chat subheads |
| `3xl` | `1.5rem` | Page / overlay titles (fixed) |
| `display` | `clamp(1.55rem, 3.6vw, 2.35rem)` | **Signal / briefing article headlines** · hero display |
| `brand` | `clamp(2.8rem, 8vw, 4.5rem)` | Overview / top brand wordmark only |

CSS vars: `--type-2xs` … `--type-3xl`, `--type-display`, `--type-brand`.

## Weights (`--weight-*`)

| Token | Value | Use |
|-------|-------|-----|
| `thin` | `200` | Display / chat titles |
| `light` | `300` | Soft body (chat turns) |
| `regular` | `400` | **Default** UI + buttons |
| `medium` | `500` | Labels, selected chips |
| `semibold` | `600` | Tabular numbers / strong meta |
| `bold` | `700` | **Content headlines only** (`.signal-title`, `.brand`) — not chrome buttons |

## Letter-spacing

| Token | Value | Use |
|-------|-------|-----|
| `--track-label` | `0.06em` | Uppercase eyebrows |
| `--track-meta` | `0.04em` | Mono hints / indices |
| `--track-tight` | `-0.01em` | Large display titles |

## Semantic text roles (required for new UI)

| Role | Class | Face | Size | Weight | Notes |
|------|-------|------|------|--------|-------|
| Display | `.ds-text-display` | display | `--type-display` | thin/light | Chrome / marketing display |
| Headline | `.ds-text-headline` / `.signal-title` | display | `--type-display` | bold | **Signals + Briefings article titles** — large, max ~22–28ch |
| Title | `.ds-text-title` | display/body | `--type-2xl` | regular | Section chrome titles |
| Body | `.ds-text-body` | body | `--type-xl` | regular/light | Prose |
| Label | `.ds-text-label` | body | `--type-sm` | medium | Optional uppercase + `--track-label` |
| Meta | `.ds-text-meta` | body | `--type-sm` | regular | Muted color |
| Hint | `.ds-text-hint` | **mono** | `--type-xs` | regular | Click-path; `color: var(--muted)` |
| Mono | `.ds-text-mono` | mono | inherit or `xs` | regular | Indices, code crumbs |
| Numeric | `.ds-text-numeric` | body/mono | inherit | medium/semibold | `font-variant-numeric: tabular-nums` |

React helper: `<Text role="…" as="p|span|h1|…">` in `design-system/components/Text.tsx` — maps to classes above; no inline rem.

## Surface map (do not flatten)

| Surface | Headline treatment |
|---------|-------------------|
| `/signals/:id` · `/research/briefings/:id` | **Large** — `.signal-title` / `<Text role="headline">` → `--type-display` + `--weight-bold` |
| Briefing magazine body | Article prose `--type-xl`; in-body h2 → `--type-2xl`; drop numerals → `--type-display` |
| Overview brand / compact hero `.brand` | **XL** — `--type-brand` |
| SectionChrome / modules | Quiet — `--type-2xl` / title role / `--weight-thin` · Spec `msqdx-ui-section-chrome.md` |
| Buttons / filters | Compact — `--type-sm\|md\|lg`, weight regular |

Compact control sizes must **not** be applied to Signal/Briefing headlines.

## Button coupling

Button sizes **must** consume type steps:

| Button size | Font size token |
|-------------|-----------------|
| `sm` | `--type-sm` |
| `md` | `--type-md` |
| `lg` | `--type-lg` |

Weight: `--weight-regular` (400).

## Acceptance

1. Spec file exists and is linked from ADR 0028 + `product-ui.md` + knowledge.
2. TS tokens match CSS `--type-*` / `--weight-*` / `--track-*` (unit tests).
3. `index.css` imports `typography.css`.
4. Storybook **Design System / Typography** shows faces, steps, weights, roles.
5. `<Text>` + Button use tokens (no hard-coded rem/weight in those components’ CSS beyond token refs).
6. `prefers-reduced-motion` unchanged (typography has no motion deps).

## Migration policy

- New code: roles / `<Text>` / type tokens only.
- Legacy `.meta`, `.hint`, `.panel-hint`: keep working; prefer aliasing to `.ds-text-*` when touching those rules.
- Full rem-audit of ranked/chat CSS: follow-up, not this pass.
