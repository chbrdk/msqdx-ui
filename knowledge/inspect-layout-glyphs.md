# Inspect layout glyphs (theme-aware catalog)

**Date:** 2026-09-09  
**Spec:** `specs/domain/msqdx-ui-inspect-layout-glyphs.md`  
**Storybook:** Foundation / Inspect Layout Glyphs

## Tokens

| Role | Treatment |
|------|-----------|
| Pillars | soft `--ink` fill + `--ink` stroke |
| Frame | ink mix ~1.5; dashed for hug/auto |
| Accent | `--accent` |
| Size | default 16×16, `ui-icon` |

## Families

Size · MediaFit · GridColumn · GridSpan · Distribute · CellPark · FlowDirection · Wrap · AutoFlow · Position · Overflow · BorderStyle · BgPosition · ClipPreset · **SelfPark** · **NinePoint** (ObjectPosition / TransformOrigin) · **TextAlign** · **AspectRatio** · **GapAxis** · **DisplayMode** · **Visibility** · **BoxSizing** · **WhiteSpace** · **Float** · **WritingMode**

Inventory / cross-app reuse: `knowledge/glyph-library.md`.

Catalog-reserve families ship in DS without waiting for app wires. CREATION consumes wired families; DisplayMode + Catalog reserve are available for later Inspect / other products.
