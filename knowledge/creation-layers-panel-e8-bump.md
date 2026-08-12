# CREATION layers panel E8 bump (msqdx-ui)

**Date:** 2026-08-12  
**Consumer:** creation-v3 (`Dockerfile` `MSQDX_UI_REF`)  
**Specs:** `msqdx-ui-layers-panel.md` · `msqdx-ui-creation-editor-chrome.md`  
**Prior waves:** `knowledge/creation-editor-chrome-e7-bump.md` · `knowledge/creation-layers-panel-bump.md`

## What landed in @msqdx/ui

| Primitive | Change |
|-----------|--------|
| `LayersPanel` | Item flags `hidden` / `locked`; `onToggleHidden` / `onToggleLocked` row icons |
| `LayersPanel` | Sibling DnD via `onReorderDrop(id, targetId, 'before' \| 'after')`; MIME `LAYERS_PANEL_DND_MIME` |
| `LayersPanel` | ▲▼ (`onMoveUp` / `onMoveDown` / `onReorder`) kept as accessible fallback |

## Consumer API (creation-v3)

```ts
import {
  LayersPanel,
  LAYERS_PANEL_DND_MIME,
  type LayersPanelItem,
  type LayersPanelReorderDropPosition,
} from '@msqdx/ui'

<LayersPanel
  items={items} // map SceneNode + chrome.hiddenIds / lockedIds → hidden / locked
  selectedId={selectedId}
  onSelect={setSelectedId}
  onToggleHidden={(id) => toggleHiddenId(id)}
  onToggleLocked={(id) => toggleLockedId(id)}
  onReorderDrop={(id, targetId, position) => reorderAmongSiblings(id, targetId, position)}
  onMoveUp={(id) => moveSibling(id, 'up')}
  onMoveDown={(id) => moveSibling(id, 'down')}
/>
```

1. Map `hidden` / `locked` from chrome; wire toggles to chrome mutations (cascade lock stays app-side).
2. Implement sibling-only `onReorderDrop`; keep ▲▼ for a11y.
3. Re-export new symbols from `apps/web/lib/msqdx-ui.ts` after bump.
4. Pin Dockerfile:

```dockerfile
ARG MSQDX_UI_REF=36653028cc609b18aa7ac8ed2b6bb34390d599a2
```

## Suggested `MSQDX_UI_REF`

E8 layers hide/lock + DnD wave is **committed** on `msqdx-ui` `main`.

```dockerfile
ARG MSQDX_UI_REF=36653028cc609b18aa7ac8ed2b6bb34390d599a2
```

**Wave commit (full):** `36653028cc609b18aa7ac8ed2b6bb34390d599a2`  
**Short:** `3665302`

## Paths

- Spec: `specs/domain/msqdx-ui-layers-panel.md`
- Component: `packages/ui/src/components/LayersPanel.*`
- CSS: `packages/ui/src/css/components.css` (`.ds-layers-panel__*`)
- Knowledge: `knowledge/components/layers-panel.md`
- Catalog / export: `packages/ui/src/storybook/catalog.ts` · `packages/ui/src/index.ts`
- Storybook: `Organisms/LayersPanel` → WithHideLock · WithDragReorder
