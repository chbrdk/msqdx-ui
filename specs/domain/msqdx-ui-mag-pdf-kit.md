# MSQDX UI — Mag PDF kit

**Status:** Accepted (P78) · Amended **P80b/c** 2026-08-14  
**Layer:** Print / Mag (PDF primitives; not Storybook HTML twins)  
**Consumers:** plexon-v3 Event Quick Check magazine PDF · creation-v3 composition Magazin-PDF  
**Related:** `knowledge/print-magazine-twins.md` · HTML twins in `packages/ui/src/print/`

## Purpose

**Single source of truth** for magazine PDF primitives (`MagChip`, `MagCover`, …) lives in `@msqdx/ui`. HTML `Print*` twins stay for Storybook / CREATION canvas; react-pdf `Mag*` ships beside them under a **subpath** so web apps do not pull `@react-pdf/renderer`.

## Non-goals

- HTML → PDF via Playwright
- Report models, EQC copy, or page packing (stay in plexon)
- Brandion-awareness inside Mag primitives (apps resolve packs → `MagThemeProvider`)

## Package surface

| Entry | Contents |
|-------|----------|
| `@msqdx/ui` | HTML Print* + app chrome (unchanged) |
| `@msqdx/ui/mag` | Mag* react-pdf kit + `magStyles` / `magColors` / `MagThemeProvider` / font register |

- **Peer (optional):** `@react-pdf/renderer` `^4.5` (target **4.6.1** as of 2026-08-14).
- Shared magazine **colors** are SSOT in `packages/ui/src/magazine/colors.ts`, re-exported as `printMagColors` and `magColors`. Helpers: `mergeMagazineColors`, `createMagStyles`.
- Fonts: `packages/ui/src/mag/fonts/` (Noto Sans); `registerMagazinePdfFonts()` resolves sibling `fonts/`.
- Twin map SoT: `packages/ui/src/magazine/twins.ts` (`PRINT_MAG_TWINS`).
- **Consumers:** plexon-v3 EQC magazine document; creation-v3 composition export (`composition-magazine-pdf` adapter — scene flatten stays in the app).

## Twin map

Same matrix as `knowledge/print-magazine-twins.md` (`Print/X` ↔ `MagX`). Changing colors or chrome MUST update the shared color module; Mag layout styles live in `mag/tokens.ts` via `createMagStyles`.

## MagTheme (P80)

`applyMagTheme` / `getMagTheme` / `MagThemeProvider` — module-scoped theme for sync PDF renders (no `React.createContext`, so Next.js API routes can import `@msqdx/ui/mag`). Apps map Brandion packs → color overrides; Mag primitives stay Brandion-agnostic. Reset with `applyMagTheme(null)` after `renderToBuffer`.

## Storybook Mag docs (P80b)

Docs-only layer `Mag/` (Overview, Page, Cover, Chip) — **must not** import Mag PDF modules into Storybook stories (avoids Font/FS side effects). HTML visual preview stays under `Print/`. Catalog entries in `storybook/catalog.ts`.

## Drift-CI (P80c)

`mag/mag-kit.test.tsx`: color twin equality + structural twin map (Mag export ↔ Print primitive ↔ Print story/mdx) + Mag smoke PDF (`%PDF`). Runs in `pnpm --filter @msqdx/ui test`.

## MagPersona*

DS props are **generic** (`MagPersonaCardModel` + label strings). Apps map domain personas / copy into those props. No `EventQuickCheckReport*` types in the DS.

## MagPage logo

`logo?: React.ReactNode` — apps inject their logo SVG (e.g. plexon/creation `MsqdxLogoPdf`). No hardcoded app path. `showLogo` gates render.

## Acceptance

1. Spec + twin knowledge updated; paths documented.
2. `@msqdx/ui/mag` exports Mag primitives; plexon/creation import from there.
3. Twin color key equality + structural twin map + MagChip smoke test.
4. Mag Storybook docs layer present without pulling Mag into `@msqdx/ui` main entry.
5. Packing + document orchestration remain in apps.
