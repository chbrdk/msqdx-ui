# Inspect layout glyphs (theme-aware)

**Date:** 2026-09-09  
**Spec:** `specs/domain/msqdx-ui-inspect-layout-glyphs.md`  
**Storybook:** Foundation / Inspect Layout Glyphs

## Tokens

| Role | Token / treatment |
|------|-------------------|
| Pillars | soft `--ink` fill + `--ink` stroke (Lucide-adjacent) |
| Frame | ink mix stroke ~1.5; dashed for Hug/Auto |
| Accent | `--accent` (rulers / stretch arrows) |
| Size | default **16×16**, class `ui-icon` |
| Brand alias | `--brand-primary` → `--accent` |

Never hardcode `#fff` for glyph fills — breaks light theme. Prefer stroke language over solid blocks.

## Consumer

CREATION Inspect imports `SizeModeGlyph`, `MediaFitGlyph`, `GridColumnGlyph`, `GridSpanGlyph` from `@msqdx/ui`.
