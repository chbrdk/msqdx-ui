# Web-System Token Foundation (Layer 0)

**Status:** Accepted — 2026-08-23  
**Owner:** `msqdx-ui`  
**Knowledge:** `knowledge/web-system-tokens.md`  
**Runtime CSS:** `packages/ui/src/css/tokens.css`  
**TS SoT:** `@msqdx/ui-tokens` (`packages/ui-tokens`)  
**Layers:** `creation-v3/knowledge/token-layers.md` (three universes stay)

## Goals

1. Complete Layer-0 **CSS-var semantics** so product and example pages can paint a full web surface system (shadcn-near pairs) without ad-hoc hex/shadow hardcodes.
2. Keep existing chrome vars (`--bg0`, `--ink`, `--accent`, `--muted`, …) stable; add **aliases + missing scales**.
3. Document a **Brandion path → Layer-0 CSS var** promote map for Library-Promote / DS-DEPOSIT — without merging stores.
4. Optionally expose a **Tailwind v4 `@theme`** that maps only onto Layer-0 vars (opt-in; not forced on apps).

## Non-goals

- Merge of Layer 0 / Brandion / CREATION token stores
- Replacing Brandion path grammar or CREATION scene binds
- Binding scenes to product-chrome vars (`--bg0`, `--primary`, …)
- Forced Tailwind adoption in creation/brandion/apps in W1
- Port of MUI / `@msqdx/react`
- Reviving legacy `@msqdx/tokens` as SoT (legacy is port reference only)

## Semantic color pairs (shadcn-near)

Every pair MUST resolve in light and dark via `data-theme` (and `:root` default). Prefer aliases onto existing Layer-0 vars.

| Semantic CSS var | Canonical alias / value | Notes |
|------------------|-------------------------|--------|
| `--background` | `var(--bg0)` | Page canvas |
| `--foreground` | `var(--ink)` | Default text |
| `--card` | `var(--surface)` | Raised card fill |
| `--card-foreground` | `var(--ink)` | |
| `--popover` | `var(--bg1)` | Overlay / popover fill |
| `--popover-foreground` | `var(--ink)` | |
| `--primary` | `var(--accent)` | Action / CTA fill |
| `--primary-foreground` | `#ffffff` | Text/icon on primary (fixed contrast) |
| `--secondary` | `var(--surface-2)` | Quiet fill |
| `--secondary-foreground` | `var(--ink)` | |
| `--muted-surface` | `color-mix(in srgb, var(--ink) 6%, var(--bg1))` | Quiet wash **surface** |
| `--muted-foreground` | `var(--muted)` | Quiet **text** |
| `--accent-surface` | `color-mix(in srgb, var(--accent) 12%, var(--bg1))` | Accent wash (not brand orange fill) |
| `--accent-foreground` | `var(--ink)` | Text on accent wash |
| `--destructive` | `var(--danger)` | |
| `--destructive-foreground` | `#ffffff` | |
| `--border` | `var(--line)` | Already present (chrome alias) |
| `--input` | `var(--field)` | Form field fill |
| `--ring` | `color-mix(in srgb, var(--accent) 55%, transparent)` | Focus ring color |
| `--ring-offset` | `var(--background)` | Ring offset fill |

### Collision: `--muted`

Existing Layer 0 `--muted` is **muted text** (ink-like). Shadcn’s `--muted` is a muted **surface**.  
**Rule:** do **not** reassign `--muted`. Use `--muted-surface` for washes and `--muted-foreground: var(--muted)` for text. Tailwind/theme maps named `muted` → `--muted-surface`.

`--accent` stays brand orange fill. Semantic `--accent-surface` / `--accent-foreground` cover the shadcn “accent wash” pair without overwriting `--accent`.

## Missing scales

### Shadows

| Var | Value (port from legacy DS effects; Layer-0 SoT) |
|-----|--------------------------------------------------|
| `--shadow-xs` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` |
| `--shadow-sm` | `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)` |
| `--shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)` |
| `--shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)` |

Defined on `:root` (theme-agnostic). Dark themes MAY later tint via `color-mix`; not required for W1.

### z-Index

| Var | Value |
|-----|-------|
| `--z-dropdown` | `1000` |
| `--z-sticky` | `1100` |
| `--z-nav-rail` | `1200` |
| `--z-modal` | `1400` |
| `--z-toast` | `1600` |
| `--z-popover` | `1500` |

Canonical steps for product chrome. Hardcoded z-index in UI SHOULD migrate to these vars over time (not a W1 gate for every call site).

### Breakpoints

CSS custom properties store the **pixel width** as a string length (for documentation / JS / `max()` patterns). Media queries cannot read custom properties in all engines — keep `@media` literals in sync with these vars.

| Var | Value | Aligns with |
|-----|-------|-------------|
| `--breakpoint-sm` | `640px` | `responsive_sm_max_px` / Tailwind `sm` |
| `--breakpoint-md` | `900px` | `responsive_md_max_px` (product tablet) |
| `--breakpoint-lg` | `1200px` | `responsive_lg_min_px` |
| `--breakpoint-xl` | `1600px` | ultra-wide entry |
| `--breakpoint-2xl` | `1920px` | ultra-wide band |

## Themes

- Light/dark continue via `data-theme` (`msqdx`, `msqdx-ui`, `msqdx-v2`, `*-dark`, `forest`, …).
- Semantic aliases live in the shared chrome-alias block so every theme inherits pairs once primitives (`--bg0`, `--ink`, …) are set.
- Each semantic pair MUST resolve under light and dark (no light-only fallbacks).

## Brandion alias / promote map (Scope 2)

Promote / DS-DEPOSIT maps Brandion **paths** → Layer-0 CSS vars. Scene binds stay on Brandion paths only.

| Brandion path | Layer-0 CSS var | Role |
|---------------|-----------------|------|
| `color.background` | `--background` / `--bg0` | Prefer `--bg0` for deposit; `--background` is alias |
| `color.ink` | `--foreground` / `--ink` | |
| `color.surface.base` | `--bg1` / `--popover` | |
| `color.surface.elevated` | `--card` / `--surface` | |
| `color.surface.raised` | `--secondary` / `--surface-2` | |
| `color.action.primary` | `--primary` / `--accent` | |
| `color.action.accent` | `--accent` | |
| `color.muted` | `--muted` / `--muted-foreground` | text |
| `color.line` | `--border` / `--line` | |
| `color.field` | `--input` / `--field` | |
| `color.status.danger` | `--destructive` / `--danger` | |
| `color.status.ok` | `--ok` | |
| `color.status.warn` | `--warn` | |

**Explicit:** CREATION `tokenBindings` MUST NOT target `--bg0`, `--primary`, or other Layer-0 chrome vars. Bind Brandion paths; resolve digital CSS from the active pack.

Full mapping + migration notes: `knowledge/web-system-tokens.md`.

## Tailwind v4 (optional, W3)

Opt-in file: `packages/ui/src/css/tailwind-theme.css` (export `@msqdx/ui/tailwind-theme.css`).

- `@theme inline` maps Tailwind color/shadow/z/breakpoint/spacing tokens **only** to `var(--…)` Layer-0 names.
- Does **not** invent a second palette.
- Apps MAY import the file when using Tailwind v4; primitives remain class-based until deliberately migrated.
- Not required for Storybook example pages (W2 uses CSS vars + existing primitives).

## Acceptance

1. Spec + knowledge published; `token-layers.md` references Layer-0 web-system completion.
2. `@msqdx/ui-tokens` exports shadow / z-index / breakpoint / web-system alias tables.
3. `tokens.css` defines semantic aliases + scales; existing `--bg0` / `--ink` / `--muted` / `--accent` unchanged in meaning.
4. Storybook Token board shows semantics, shadows, ring, z-index.
5. ≥1 Landing + ≥1 App-shell example page use only Layer-0 semantics (no ad-hoc hex/shadow).
6. Optional Tailwind theme file present and documented; not wired as a hard dependency of consuming apps.

## Phases

| Phase | Deliverable |
|-------|-------------|
| W0 | This spec + knowledge + token-layers update |
| W1 | TS + `tokens.css` + Token Storyboard |
| W2 | Example page compositions in Storybook |
| W3 | Opt-in Tailwind `@theme` |
