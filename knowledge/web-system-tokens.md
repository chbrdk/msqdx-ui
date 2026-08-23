# Web-System Tokens — mapping & migration

**Spec:** `specs/domain/web-system-tokens.md`  
**Date:** 2026-08-23  
**Related:** `creation-v3/knowledge/token-layers.md` · `brandion-v3/knowledge/ds-deposit-path-map.md`

## Layer reminder

| Layer | Store | Bind target |
|-------|--------|-------------|
| 0 Product chrome | `@msqdx/ui` / `tokens.css` | App/shell CSS only |
| 1 Brand SSOT | Brandion guideline | Paths (`color.action.primary`, …) |
| 2 Composition | CREATION scene | Paths via `tokenBindings` |

Web-system semantics extend **Layer 0 only**. They do not replace Brandion paths.

## Alt → Neu (CSS)

| Existing (keep) | New semantic alias | Notes |
|-----------------|--------------------|--------|
| `--bg0` | `--background` | |
| `--ink` / `--fg` | `--foreground` | |
| `--surface` | `--card` | |
| `--bg1` | `--popover` | also `--paper` |
| `--accent` | `--primary` | fill CTA |
| — | `--primary-foreground` | `#ffffff` |
| `--surface-2` | `--secondary` | |
| `--muted` | `--muted-foreground` | **text**; do not overwrite `--muted` |
| — | `--muted-surface` | wash background |
| — | `--accent-surface` / `--accent-foreground` | wash pair; `--accent` stays orange |
| `--danger` | `--destructive` | |
| — | `--destructive-foreground` | `#ffffff` |
| `--line` | `--border` | already aliased |
| `--field` | `--input` | |
| — | `--ring` / `--ring-offset` | focus |
| — | `--shadow-xs`…`--shadow-xl` | elevation |
| — | `--z-dropdown`…`--z-toast` | stacking |
| `--responsive-sm-max`… | `--breakpoint-sm`…`--breakpoint-2xl` | sm/md/lg alias responsive; xl/2xl ultra-wide |

## Brandion path → Layer-0 (promote / deposit)

Prefer **legacy chrome names** in DS-DEPOSIT packs (`--bg0`, `--accent`) so existing packs stay valid. Semantic aliases are CSS-only synonyms.

| Brandion path | Deposit / promote CSS | Semantic synonym |
|---------------|----------------------|------------------|
| `color.background` | `--bg0` | `--background` |
| `color.ink` | `--ink` | `--foreground` |
| `color.surface.base` | `--bg1` | `--popover` |
| `color.surface.elevated` | `--surface` | `--card` |
| `color.surface.raised` | `--surface-2` | `--secondary` |
| `color.action.primary` | `--accent` | `--primary` |
| `color.action.accent` | `--accent` | `--primary` |
| `color.muted` | `--muted` | `--muted-foreground` |
| `color.line` | `--line` | `--border` |
| `color.field` | `--field` | `--input` |
| `color.status.danger` | `--danger` | `--destructive` |
| `color.status.ok` | `--ok` | — |
| `color.status.warn` | `--warn` | — |

Shadows, z-index, ring, and breakpoints are **product chrome only** — no Brandion leaf required for W1. If deposit later needs elevation, add typed leaves under Brandion; do not invent CREATION-only paths.

## Migration rules

1. New surfaces SHOULD prefer semantic names (`background`, `card`, `primary`, `ring`) when authoring page/example CSS.
2. Existing primitives MAY keep `--bg0` / `--ink` / `--accent`; both resolve.
3. Never bind CREATION nodes to Layer-0 vars.
4. Do not reassign `--muted` or `--accent` meanings.
5. Replace hardcoded `box-shadow` / `z-index` with scale vars when touching a file.
6. Tailwind (optional): import `@msqdx/ui/tailwind-theme.css`; do not duplicate hex in `@theme`.

## Storybook

- Token board: `Foundation/WebSystemTokens`
- Example pages: `Pages/WebSystem/*`

## Tailwind opt-in

File: `packages/ui/src/css/tailwind-theme.css`  
Package export: `@msqdx/ui/tailwind-theme.css`  
Requires consumer Tailwind v4; not loaded by default `styles.css`.
