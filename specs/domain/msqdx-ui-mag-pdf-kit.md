# MSQDX UI — Mag PDF kit

**Status:** Accepted (P78) — 2026-08-14  
**Layer:** Print / Mag (PDF primitives; not Storybook HTML twins)  
**Consumers:** plexon-v3 Event Quick Check magazine PDF  
**Related:** `knowledge/print-magazine-twins.md` · HTML twins in `packages/ui/src/print/`

## Purpose

**Single source of truth** for magazine PDF primitives (`MagChip`, `MagCover`, …) lives in `@msqdx/ui`. HTML `Print*` twins stay for Storybook / CREATION canvas; react-pdf `Mag*` ships beside them under a **subpath** so web apps do not pull `@react-pdf/renderer`.

## Non-goals

- HTML → PDF via Playwright
- Export of a CREATION composition scene as QuickCheck PDF (later wave)
- Report models, EQC copy, or page packing (stay in plexon)

## Package surface

| Entry | Contents |
|-------|----------|
| `@msqdx/ui` | HTML Print* + app chrome (unchanged) |
| `@msqdx/ui/mag` | Mag* react-pdf kit + `magStyles` / `magColors` / font register |

- **Peer (optional):** `@react-pdf/renderer` `^4.5` (target **4.6.1** as of 2026-08-14).
- Shared magazine **colors** are SSOT in `packages/ui/src/magazine/colors.ts`, re-exported as `printMagColors` and `magColors`.
- Fonts: `packages/ui/src/mag/fonts/` (Noto Sans); `registerMagazinePdfFonts()` resolves sibling `fonts/`.
- **Consumers:** plexon-v3 EQC magazine document; creation-v3 composition export (`composition-magazine-pdf` adapter — scene flatten stays in the app).

## Twin map

Same matrix as `knowledge/print-magazine-twins.md` (`Print/X` ↔ `MagX`). Changing colors or chrome MUST update the shared color module; Mag layout styles live in `mag/tokens.ts`.

## MagPersona*

DS props are **generic** (`MagPersonaCardModel` + label strings). Apps map domain personas / copy into those props. No `EventQuickCheckReport*` types in the DS.

## MagPage logo

`logo?: React.ReactNode` — apps inject their logo SVG (e.g. plexon `MsqdxLogoPdf`). No hardcoded app path.

## Acceptance

1. Spec + twin knowledge updated; paths documented.
2. `@msqdx/ui/mag` exports Mag primitives; plexon `eqc-magazine-pdf` imports from there (or thin re-export).
3. Twin color key equality test; MagChip smoke test.
4. Packing + document orchestration remain in plexon.
