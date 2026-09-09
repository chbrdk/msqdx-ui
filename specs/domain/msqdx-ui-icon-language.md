# MSQDX UI icon language

**Status:** Accepted · 2026-09-09 · Wave 1  
**Layer:** Foundation  
**Vision:** Replace Lucide wrappers with one custom optical language shared with inspect layout glyphs.

## Problem

`Icon*` exports were Lucide wraps (`strokeWidth` ≈ 1.75). Inspect layout glyphs already use a sharper, theme-token language (`ds-inspect-glyph*`, hairline `non-scaling-stroke`). Mixing both reads as two design systems.

## Rules

1. **Stable API.** Apps keep named `Icon*` exports from `@msqdx/ui`. Internals may swap Lucide → custom without consumer renames.
2. **One optical language, two layers:**
   - **UI icons** — general chrome metaphors (`IconCheck`, `IconPlus`, …). Class `ui-icon` + `ds-ui-icon`. Strokes use `currentColor` (inherits chrome ink). Soft fills only when the metaphor needs mass.
   - **Layout glyphs** — diagrammatic inspect chrome (`SizeModeGlyph`, …). Class `ui-icon` + `ds-inspect-glyph*`. Pillars/frames/accent as in `msqdx-ui-inspect-layout-glyphs.md`.
3. Geometry: **16×16 viewBox**. Default render **16px**. Recommended sizes via `INSPECT_GLYPH_SIZE` / same `size` prop (sm 16 / md 24 / lg 32 / xl 48).
4. Strokes MUST stay hairline at large sizes (`vector-effect: non-scaling-stroke`). No `#fff` / `#000` / brand hex in SVG or CSS.
5. Align/Justify matrix stays under `IconAlign*` / `IconJustify*` (custom redraw later — **not** replaced by layout glyphs).
6. No new direct `lucide-react` imports in package components or stories. Residual Lucide only inside `icons.tsx` wraps until migrated.
7. Storybook **Foundation / Icons** MUST show custom wave, size ladder, and residual Lucide gallery. Inventory: `knowledge/icon-catalog.md`.

## Wave 1 catalog (custom)

**New:** Plus, MoreHorizontal, MoreVertical, Settings, Sliders, Copy, Clipboard, Download, Upload, ExternalLink, Layers, Refresh, Filter, Home, Menu, PanelLeft.

**Redrawn (same export names):** Research/Search, Check, Close, ChevronUp/Down/Right, Edit, Trash, Eye/EyeOff, Lock/Unlock.

## Layout glyph add-ons (Wave 1)

| Export | IDs |
|--------|-----|
| `MarginPaddingGlyph` | `margin` \| `padding` \| `both` |
| `StackOrderGlyph` | `front` \| `forward` \| `backward` \| `back` |

## Migration (Vision D)

Track every `Icon*` as `custom` or `lucide-wrap` in `knowledge/icon-catalog.md`. Follow-up waves redraw remaining wraps (typo toolbar, media, nav, align matrix, domain oddities). Drop `lucide-react` only when inventory is all `custom` and no direct imports remain.

## Dual-ship

Ship `@msqdx/ui` first. Apps pick up via `MSQDX_UI_REF` pin; no forced app bump in Wave 1.
