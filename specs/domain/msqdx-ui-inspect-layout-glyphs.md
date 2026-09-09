# Inspect layout glyphs — MSQDX UI

**Status:** Accepted · 2026-09-09 · **Catalog complete**  
**Layer:** Foundation (custom SVG glyphs, not Lucide wraps)  
**Consumers:** CREATION Inspect (and any product needing layout diagrams)

## Problem

App-local inspect glyphs used hardcoded `#ffffff` fills. That reads on dark chrome and disappears on light theme. Accents fell back to non-canonical brand hexes instead of `--accent`.

## Rules

1. Glyph geometry is shared presentation only — no scene writes, no CREATION domain props.
2. Colors MUST come from theme tokens only:
   - **Pillars / cells:** soft `--ink` fill (~16%) + `--ink` stroke (Lucide-adjacent, not solid blocks)
   - **Empty slots:** dashed hairline in ink mix
   - **Frame:** rounded square stroke (~1.5), optional dashed for Hug / Auto
   - **Accent strokes** (fixed ruler, fill arrows): `var(--accent)`
3. Optical language MUST stay close to Foundation Lucide icons: default **16×16**, stroke ≈ **1.5–1.75**, class `ui-icon` + `ds-inspect-glyph`.
4. MUST NOT hardcode `#fff`, `#000`, or brand hex in glyph SVG/CSS.
5. CSS class prefix: `ds-inspect-glyph` (not `creation-*`).
6. Storybook MUST show the full set under **Foundation / Inspect Layout Glyphs**, include **Vs Icons** and a **Catalog** overview, and remain readable light ↔ dark.
7. Apps compose tiles/buttons; they MUST NOT re-skin glyph fills with theme-breaking overrides.
8. Do **not** duplicate Lucide Align/Justify/SpaceBetween wraps — those stay in `icons.tsx`. Layout glyphs cover diagrammatic cases Lucide does not.

## Catalog (families)

| Export | IDs |
|--------|-----|
| `SizeModeGlyph` | `hug` \| `fill` \| `fixed` (+ `axis`) |
| `MediaFitGlyph` | `cover` \| `contain` \| `auto` \| `fill` \| `none` \| `scale-down` |
| `GridColumnGlyph` | equal / responsive / splits |
| `GridSpanGlyph` | `span-auto` … `span-full` (`axis` col\|row) |
| `DistributeGlyph` | `packed` \| `even` |
| `CellParkGlyph` | `start` \| `center` \| `end` \| `stretch` (+ `axis` h\|v) |
| `FlowDirectionGlyph` | `row` \| `column` \| `row-reverse` \| `column-reverse` |
| `WrapGlyph` | `nowrap` \| `wrap` |
| `AutoFlowGlyph` | `row` \| `column` \| `dense` |
| `PositionGlyph` | `static` \| `relative` \| `absolute` \| `fixed` \| `sticky` |
| `OverflowGlyph` | `visible` \| `hidden` \| `scroll` \| `auto` |
| `BorderStyleGlyph` | `solid` \| `dashed` \| `dotted` \| `none` |
| `BgPositionGlyph` | `center` \| `top` \| `bottom` \| `left` \| `right` |
| `ClipPresetGlyph` | `none` \| `slant-bottom` \| `slant-bottom-flip` \| `slant-top` \| `trapezoid` \| `parallelogram` |
| `SelfParkGlyph` | `auto` \| `start` \| `center` \| `end` \| `stretch` (+ `axis` h\|v) — alignSelf / justifySelf |
| `NinePointGlyph` (`ObjectPositionGlyph` / `TransformOriginGlyph`) | 9-pip anchors |
| `TextAlignGlyph` | `start` \| `center` \| `end` \| `justify` |
| `AspectRatioGlyph` | `free` \| `1-1` \| `16-9` \| `4-3` \| `3-2` \| `9-16` \| `21-9` |
| `GapAxisGlyph` | `both` \| `row` \| `column` |
| `DisplayModeGlyph` | `block` \| `inline-block` \| `inline` \| `flex` \| `inline-flex` \| `grid` \| `inline-grid` \| `table` \| `list-item` \| `contents` \| `none` |
| `VisibilityGlyph` | `visible` \| `hidden` \| `collapse` |
| `BoxSizingGlyph` | `content-box` \| `border-box` |
| `WhiteSpaceGlyph` | `normal` \| `nowrap` \| `pre` \| `pre-wrap` |
| `FloatGlyph` | `none` \| `left` \| `right` |
| `WritingModeGlyph` | `horizontal` \| `vertical` |

Helpers: `sizeModeGlyphId`, `mediaFitGlyphId`, `mediaFitLabel`, `columnGlyphForPresetLabel`, `spanGlyphForPresetLabel`, `distributeGlyphId`, `cellParkGlyphId`, `flowDirectionGlyphId`, `wrapGlyphId`, `autoFlowGlyphId`, `positionGlyphId`, `overflowGlyphId`, `borderStyleGlyphId`, `bgPositionGlyphId`, `clipPresetGlyphId`, `selfParkGlyphId`, `ninePointGlyphId`, `objectPositionGlyphId`, `transformOriginGlyphId`, `textAlignGlyphId`, `aspectRatioGlyphId`, `gapAxisGlyphId`, `displayModeGlyphId`, `ninePointWriteValue`, `visibilityGlyphId`, `boxSizingGlyphId`, `whiteSpaceGlyphId`, `floatGlyphId`, `writingModeGlyphId`.

Source files: `InspectLayoutGlyphs.tsx`, `InspectLayoutGlyphsExtra.tsx`, `InspectLayoutGlyphsMore.tsx`, `InspectLayoutGlyphsCatalog.tsx`. Inventory: `knowledge/glyph-library.md`.

**Rule:** Catalog glyphs MAY ship in `@msqdx/ui` before any app wires them. Consumer wiring is optional and tracked separately.

## Dual-ship

CREATION Web consumes from `@msqdx/ui`. Inspect wires Extra families plus SelfPark / ObjectPosition / TextAlign (and related segmented enums). macOS mirrors with native SVG/Swift paths where the control exists. Do not duplicate Lucide Align/Justify matrices. Catalog-reserve families (`Visibility`, `BoxSizing`, `WhiteSpace`, `Float`, `WritingMode`, expanded `DisplayMode`) are DS-complete without a required consumer.
