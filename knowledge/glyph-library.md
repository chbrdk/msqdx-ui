# Glyph library inventory (SSOT)

**Date:** 2026-09-09  
**Package:** `@msqdx/ui`  
**Rule:** App shells re-export only — no app-local SVG copies of these families.

## Layers

| Layer | Role | Examples |
|-------|------|----------|
| **Foundation layout glyphs** | Diagrammatic inspect chrome (spatial / CSS layout metaphors) | `SizeModeGlyph`, `SelfParkGlyph`, `NinePointGlyph`, … |
| **Molecules token glyphs** | Token Studio / picker kind metaphors (not layout) | `TokenKindGlyph`, `TokenPreview` |
| **Foundation Lucide wraps** | Generic UI icons; keep for Align/Justify matrices | `IconAlign*`, `IconColumns`, … |

Do **not** replace the Lucide Align/Justify matrix with layout glyphs.

## Layout families (complete catalog)

| Family | File | Wire priority |
|--------|------|----------------|
| SizeMode | `InspectLayoutGlyphs.tsx` | CREATION size box |
| MediaFit | same | CREATION media / bg-size |
| GridColumn / GridSpan | same | CREATION grid presets |
| Distribute / CellPark | `InspectLayoutGlyphsExtra.tsx` | CREATION flex / grid park |
| Flow / Wrap / AutoFlow | Extra | CREATION layout |
| Position / Overflow / BorderStyle | Extra | CREATION constraints / appearance |
| BgPosition / ClipPreset | Extra | CREATION fill / clip |
| SelfPark | `InspectLayoutGlyphsMore.tsx` | alignSelf / justifySelf |
| NinePoint (`ObjectPosition` / `TransformOrigin`) | More | media + transform origin |
| TextAlign | More | typography segmented |
| AspectRatio | More | CREATION constraints; VIDEON reframe / cut canvas |
| GapAxis | More | CREATION gap expand + axis rows |
| DisplayMode | More | display enum (when exposed) |

## Token families

| Family | File | Consumers |
|--------|------|-----------|
| TokenKindGlyph | `TokenKindGlyph.tsx` | CREATION Token Studio + TokenPicker fields; Brandion chapter / type chips / card meta / lab raw |
| TokenPreview | `TokenPreview.tsx` | TokenPicker / Studio value chips |

## Out of scope (intentionally)

- Blend-mode / filter effect glyphs
- Product mascots / brand marks
- Per-app one-off SVG fills (`#fff` / brand hex)

## Storybook

**Foundation / Inspect Layout Glyphs** — full Catalog + Vs Icons.  
**Molecules / TokenKindGlyph** — kind metaphors.
