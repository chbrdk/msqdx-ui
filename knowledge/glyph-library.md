# Glyph library inventory (SSOT)

**Date:** 2026-09-09  
**Package:** `@msqdx/ui`  
**Rule:** App shells re-export only — no app-local SVG copies of these families.  
**Rule:** Catalog glyphs MAY exist without a consumer. Wire when a control appears.

## Layers

| Layer | Role | Examples |
|-------|------|----------|
| **Foundation layout glyphs** | Diagrammatic inspect chrome (spatial / CSS layout metaphors) | `SizeModeGlyph`, `SelfParkGlyph`, `DisplayModeGlyph`, … |
| **Foundation UI icons** | General chrome metaphors — fully custom (Waves 1–4) | `IconPlus`, `IconAlignLeft`, … — see `knowledge/icon-catalog.md` |
| **Molecules token glyphs** | Token Studio / picker kind metaphors (not layout) | `TokenKindGlyph`, `TokenPreview` |

Do **not** replace the Align/Justify `Icon*` matrix with layout glyphs — they are custom UI icons in Wave 4.

## Layout families (wired)

| Family | File | Typical consumer |
|--------|------|------------------|
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

## Layout families (catalog reserve — DS only OK)

| Family | File | Notes |
|--------|------|-------|
| DisplayMode | More | Full CSS display set (`block`…`none`, table, contents, …) |
| Visibility | `InspectLayoutGlyphsCatalog.tsx` | visible / hidden / collapse |
| BoxSizing | Catalog | content-box / border-box |
| WhiteSpace | Catalog | normal / nowrap / pre / pre-wrap |
| Float | Catalog | none / left / right |
| WritingMode | Catalog | horizontal / vertical |
| MarginPadding | Catalog | margin / padding / both |
| StackOrder | Catalog | front / forward / backward / back |

## Token families

| Family | File | Consumers |
|--------|------|-----------|
| TokenKindGlyph | `TokenKindGlyph.tsx` | CREATION Token Studio + TokenPicker fields; Brandion chapter / type chips / card meta / lab raw |
| TokenPreview | `TokenPreview.tsx` | TokenPicker / Studio value chips |

## Out of scope (intentionally)

- Blend-mode / filter effect glyphs
- Product mascots / brand marks
- Per-app one-off SVG fills (`#fff` / brand hex)
- Checkion/Audion/Plexon report/chat chrome (no CSS layout enums)

## Storybook

**Foundation / Inspect Layout Glyphs** — Catalog + DisplayModes + Catalog reserve + Vs Icons + **Size ladder** + **Large (32/48)**.  
**Molecules / TokenKindGlyph** — kind metaphors.

## Sizes

| Token | px | Use |
|-------|----|-----|
| `INSPECT_GLYPH_SIZE.sm` | 16 | Inspect chrome / Lucide parity (default) |
| `INSPECT_GLYPH_SIZE.md` | 24 | Compact toolbars |
| `INSPECT_GLYPH_SIZE.lg` | 32 | Segmented controls / chips |
| `INSPECT_GLYPH_SIZE.xl` | 48 | Docs tiles / Storybook review |

Pass as `<SizeModeGlyph id="fill" size={INSPECT_GLYPH_SIZE.xl} />`. Geometry stays 16×16 viewBox; strokes stay hairline (`non-scaling-stroke`) so large tiles stay sharp.
