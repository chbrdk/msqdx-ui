# Print ↔ Mag magazine twins

Stand: 2026-08-14 (P78)

**SSOT:** both surfaces live in `msqdx-ui`. Shared colors: `packages/ui/src/magazine/colors.ts` (`printMagColors` / `magColors`).

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

- HTML: `packages/ui/src/print/` · CSS `packages/ui/src/css/print.css` · catalog layer `Print`
- PDF: `packages/ui/src/mag/` · import `@msqdx/ui/mag` (optional peer `@react-pdf/renderer`)
- Consumer document/packing: plexon `eqc-magazine-pdf.tsx` + `pack-magazine-pages.ts` (not in DS)
- Spec: `specs/domain/msqdx-ui-mag-pdf-kit.md`

Staging: `URL_MSQDX_UI_STORYBOOK` → `https://ds.projects-a.plygrnd.tech/?path=/story/print-quickcheck--magazine-deck`

**Creation:** editor stays on Print*; change Print/Mag chrome in msqdx-ui, not in the Creation editor.
