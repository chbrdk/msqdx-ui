# CREATION layers panel multi-select bump (msqdx-ui)

**Date:** 2026-08-13  
**Consumer:** creation-v3 (`Dockerfile` `MSQDX_UI_REF`) — P63 / W-UI-FINETUNE-2  
**Specs:** `specs/domain/msqdx-ui-layers-panel.md`  
**Prior:** `knowledge/creation-layers-panel-e8-bump.md`

## What landed in @msqdx/ui

| Primitive | Change |
|-----------|--------|
| `LayersPanel` | `selectedIds?: readonly string[]` — native multi highlight |
| `LayersPanel` | Secondary ids use `--multi-selected` + `data-multi-selected` |
| `LayersPanel` | `onSelect(id, mods?)` passes Shift / Meta / Ctrl |
| `LayersPanel` | Stronger sibling drop-before/after chrome (`data-drop-edge`) |
| Types | Export `LayersPanelSelectMods` |

## Consumer wiring (creation-v3)

```tsx
<LayersPanel
  items={items}
  selectedId={selectedId}
  selectedIds={selectedIds}
  onSelect={(id, mods) => selectNode(id, mods)}
/>
```

Canvas `selectedIds` remains SSOT. No app DOM class patching for secondary highlight.

## Pin

```dockerfile
ARG MSQDX_UI_REF=86971324812c094062f74d206c010bb3b547741e
```

Document in creation-v3 `knowledge/paths.md` + `knowledge/creation-layers-panel-multi-bump.md`.
