# Inspect layout glyphs (theme-aware)

**Date:** 2026-09-09  
**Spec:** `specs/domain/msqdx-ui-inspect-layout-glyphs.md`  
**Storybook:** Foundation / Inspect Layout Glyphs

## Tokens

| Role | Token |
|------|--------|
| Strong fill (pillars) | `--ink` |
| Soft / empty | ink mixes |
| Frame | `--line` |
| Accent strokes | `--accent` |
| Brand alias | `--brand-primary` → `--accent` |

Never hardcode `#fff` for glyph fills — breaks light theme.

## Consumer

CREATION Inspect imports `SizeModeGlyph`, `MediaFitGlyph`, `GridColumnGlyph`, `GridSpanGlyph` from `@msqdx/ui`.
