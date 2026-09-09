# Inspect layout glyphs — MSQDX UI

**Status:** Accepted · 2026-09-09  
**Layer:** Foundation (custom SVG glyphs, not Lucide wraps)  
**Consumers:** CREATION Inspect (size modes, media fit, grid presets/span)

## Problem

App-local inspect glyphs used hardcoded `#ffffff` fills. That reads on dark chrome and disappears on light theme. Accents fell back to non-canonical brand hexes instead of `--accent`.

## Rules

1. Glyph geometry is shared presentation only — no scene writes, no CREATION domain props.
2. Colors MUST come from theme tokens only:
   - **Fill (strong cells / “pillars”):** `var(--ink)` — dark on light, light on dark
   - **Empty / soft cells:** `color-mix` of `--ink` at low opacity
   - **Frame / hairline:** `var(--line)`
   - **Accent strokes** (fixed ruler, fill arrows, active emphasis): `var(--accent)`
3. MUST NOT hardcode `#fff`, `#000`, or brand hex in glyph SVG/CSS.
4. CSS class prefix: `ds-inspect-glyph` (not `creation-*`).
5. Storybook MUST show the full set under **Foundation / Inspect Layout Glyphs** and remain readable when switching light ↔ dark themes in the toolbar.
6. Apps compose tiles/buttons; they MUST NOT re-skin glyph fills with theme-breaking overrides.

## API

| Export | Role |
|--------|------|
| `SizeModeGlyph` | `hug` \| `fill` \| `fixed` (+ optional `axis`) |
| `MediaFitGlyph` | `cover` \| `contain` \| `auto` \| `fill` \| `none` \| `scale-down` |
| `GridColumnGlyph` | equal / responsive / split column diagrams |
| `GridSpanGlyph` | col/row span 4-slot track |
| Helpers | `sizeModeGlyphId`, `mediaFitGlyphId`, `mediaFitLabel`, `columnGlyphForPresetLabel`, `spanGlyphForPresetLabel` |

## Dual-ship

CREATION Web consumes these from `@msqdx/ui`. macOS may mirror geometry with native fills mapped to the same semantic roles (ink / accent / line).
