# Print ↔ Mag magazine twins

Stand: 2026-08-14 (P78 · **P80b/c**)

**SSOT:** both surfaces live in `msqdx-ui`. Shared colors: `packages/ui/src/magazine/colors.ts` (`printMagColors` / `magColors`). Twin matrix code: `packages/ui/src/magazine/twins.ts`.

| Storybook (HTML) | PDF (`@msqdx/ui/mag`) |
| --- | --- |
| Print/Cover | MagCover (+ PullQuote fazit) |
| Print/Chapter | MagChapter (+ index) |
| Print/ScoreRing | MagScoreRing |
| Print/Donut | MagDonut |
| Print/Ledger | MagLedger |
| Print/RankedList | MagRankedList (1 / 2 cols / compact) |
| Print/TwoColumn | MagTwoColumn |
| Print/PullQuote | MagPullQuote |
| Print/PersonaGrid | MagPersonaGrid / MagPersonaCard |
| Print/TraitBars | MagTraitBars |
| Print/Table | MagTable |
| Print/Chip | MagChip |
| Print/QuickCheck | composed magazine deck (HTML only) |
| Mag/Overview · Mag/Page · Mag/Cover · Mag/Chip | Docs-only Mag layer (no react-pdf in Storybook canvas) |

- HTML: `packages/ui/src/print/` · CSS `packages/ui/src/css/print.css` · catalog layer `Print`
- PDF: `packages/ui/src/mag/` · import `@msqdx/ui/mag` (optional peer `@react-pdf/renderer`)
- Theme: `MagThemeProvider` + `mergeMagazineColors` / `createMagStyles` (apps map Brandion → colors)
- Drift-CI: `packages/ui/src/mag/mag-kit.test.tsx` (colors + twin map + `%PDF` smoke)
- Consumer document/packing: plexon `eqc-magazine-pdf.tsx` + `pack-magazine-pages.ts` (not in DS)
- Consumer composition export: creation-v3 `lib/magazine-pdf/` (scene → Mag Document; not in DS)
- Spec: `specs/domain/msqdx-ui-mag-pdf-kit.md`

Staging: `URL_MSQDX_UI_STORYBOOK` → `https://ds.projects-a.plygrnd.tech/?path=/story/print-quickcheck--magazine-deck`  
Mag docs: `https://ds.projects-a.plygrnd.tech/?path=/story/mag-overview--docs`

**Creation:** editor stays on Print*; change Print/Mag chrome in msqdx-ui, not in the Creation editor.
