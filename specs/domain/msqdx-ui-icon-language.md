# MSQDX UI icon language

**Status:** Accepted · 2026-09-09 · Wave 6 (chrome aliases + chat)  
**Layer:** Foundation  
**Vision:** Curated custom icon language shared with inspect layout glyphs — not Lucide-scale completeness.

## Problem

`Icon*` exports were Lucide wraps (`strokeWidth` ≈ 1.75). Inspect layout glyphs already use a sharper, theme-token language (`ds-inspect-glyph*`, hairline `non-scaling-stroke`). Mixing both reads as two design systems.

## Rules

1. **Stable API.** Apps keep named `Icon*` exports from `@msqdx/ui`. Internals may swap without consumer renames.
2. **One optical language, two layers:**
   - **UI icons** — general chrome metaphors (`IconCheck`, `IconPlus`, …). Class `ui-icon` + `ds-ui-icon`. Strokes use `currentColor`. Soft fills only when the metaphor needs mass.
   - **Layout glyphs** — diagrammatic inspect chrome (`SizeModeGlyph`, …). Class `ui-icon` + `ds-inspect-glyph*`.
3. Geometry: **16×16 viewBox**. Default render **16px**. Recommended sizes via `INSPECT_GLYPH_SIZE` (sm 16 / md 24 / lg 32 / xl 48).
4. Strokes MUST stay hairline at large sizes (`vector-effect: non-scaling-stroke`). No `#fff` / `#000` / brand hex in SVG or CSS.
5. Align/Justify matrix lives under `IconAlign*` / `IconJustify*` / `IconSpace*` as **custom** icons (Wave 4) — not layout glyphs.
6. **No `lucide-react` dependency** in `@msqdx/ui`. Do not reintroduce direct Lucide imports.
7. Storybook **Foundation / Icons** shows custom waves + size ladder. Inventory: `knowledge/icon-catalog.md`.

## Wave catalogs

| Wave | File | Focus |
|------|------|-------|
| 1 | `UiIconsCore.tsx` | Core chrome |
| 2 | `UiIconsWave2.tsx` | Typography, editor, status |
| 3 | `UiIconsWave3.tsx` | Nav, media, layout props, effects |
| 4 | `UiIconsWave4.tsx` | Align / Justify matrix |
| 5 | `UiIconsWave5.tsx` | Platform gaps: ChevronLeft, panels, grip, pin/star/bookmark, list/table/calendar/bell, files/folders, play/pause/scissors/crop/hand, message/code/import/scan, group/ungroup/diamond, bring/send, auth (logout/key/shield/building/globe), loader |
| 6 | `UiIconsWave6.tsx` | `IconHamburger` (=Menu), `IconChat` (=Message), `IconMessageCircle`, `IconMessagePlus`, `IconBot`, `IconXCircle` |

Further icons: **on-demand** when an app control needs them — audit app icon imports first.

Typography HUD (2026-09-11): `IconType`/`IconText` = single A; `IconFontSize` = small+large A on a soft baseline; `IconFontWeight` = same-size stack (solid A half-hidden behind, hairline A in front). CREATION HUD chips render glyphs at 1.25rem.

Box spacing HUD (2026-09-11): `IconPadding` = solid element frame + filled inset + **inward** ticks; `IconMargin` = **dashed** outer ring + hollow content + **outward** ticks; `IconGap` = sibling spacing bars. Storybook: Foundation/Icons → **Box spacing**.

Table structure HUD (2026-09-11): `IconTableAddRow` = table grid + bottom plus; `IconTableAddColumn` = table grid + side plus. Storybook: Foundation/Icons → **Table structure**.

Table segmented HUD Wave C (2026-09-11): density = `IconDensityCompact` / `IconDensityDefault` / `IconDensityComfortable`; borders = `IconBordersNone` / `IconBordersRow` / `IconBordersAll`. Storybook: Foundation/Icons → **Table segmented**.

## Layout glyph add-ons

| Export | IDs |
|--------|-----|
| `MarginPaddingGlyph` | `margin` \| `padding` \| `both` |
| `StackOrderGlyph` | `front` \| `forward` \| `backward` \| `back` |

See `msqdx-ui-inspect-layout-glyphs.md`.

## Dual-ship

Ship `@msqdx/ui` first. Apps pick up via `MSQDX_UI_REF` pin.
