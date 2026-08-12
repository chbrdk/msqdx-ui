# CREATION inspect chrome E10 bump (msqdx-ui)

**Date:** 2026-08-12  
**Consumer:** creation-v3 (`Dockerfile` `MSQDX_UI_REF`)  
**Specs:** `msqdx-ui-creation-editor-chrome.md` · `msqdx-ui-field.md` · `msqdx-ui-layers-panel.md` · `msqdx-ui-token-picker.md` · `msqdx-ui-foundation.md`  
**Prior:** `knowledge/creation-inspect-chrome-e9-bump.md`

## Why

Inspect and editor chrome still used text chips, unicode hide/lock/move, and magazine NavRail. Design tools (Penpot / Figma / Zaoly) lead with **icons**.

## What landed in @msqdx/ui

| Primitive | Change |
|-----------|--------|
| Icons | Editor wraps: undo/redo/zoom/save, align/justify/direction, layout props, type glyphs, layers eye/lock/chevrons. lucide-react `^1.31.0`. |
| `Field.icon` | Optional 16px leading glyph in the label row. |
| `ToggleGroup` `variant="icon"` | Square chips; `option.icon` visible, `option.label` is the accessible name. |
| `ComponentPaletteItem.icon` | Passed to `Button` `icon`. |
| `LayersPanelItem.icon` | Leading type glyph. Hide/lock/move/chevron are lucide, not unicode. |
| `TokenPicker` `icon` | Optional glyph beside the label. |

Apps own name → icon maps. Values stay token/enum.

## Pin after push

```dockerfile
ARG MSQDX_UI_REF=<this-commit-sha>
```

Grep in creation-v3 Dockerfile: `ds-toggle-group--icon` · `IconUndo`.
