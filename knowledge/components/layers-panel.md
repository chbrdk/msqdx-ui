# LayersPanel

Organism for CREATION / composition editor left-rail structure trees.

## Consumer mapping (creation-v3)

```ts
function toLayerItem(node: SceneNode, chrome: ChromeState): LayersPanelItem {
  return {
    id: node.id,
    label: node.name?.trim() || node.type,
    type: node.type,
    hidden: chrome.hiddenIds.includes(node.id),
    locked: chrome.lockedIds.includes(node.id),
    children: node.children?.map((c) => toLayerItem(c, chrome)),
  }
}

<LayersPanel
  items={[toLayerItem(scene.root, chrome)]}
  selectedId={selectedId}
  onSelect={setSelectedId}
  onToggleHidden={(id) => toggleHidden(id)}
  onToggleLocked={(id) => toggleLocked(id)}
  onReorderDrop={(id, targetId, position) => reorderSibling(id, targetId, position)}
  onMoveUp={(id) => moveSibling(id, 'up')}
  onMoveDown={(id) => moveSibling(id, 'down')}
  title={t('editor.layers')}
/>
```

## Notes

- Hide / lock flags are display + toggle chrome only — cascade lock / chrome JSON stay in the app (Zaoly R41/R47/R51/R59).
- Persist collapse ids in session chrome if needed — primitive is uncontrolled expand for v1.
- DnD is **siblings only**; reparent stays app-owned if needed later.
- Export: `LayersPanel`, `LAYERS_PANEL_DND_MIME`, `LayersPanelReorderDropPosition`.

## Bump

Pin: `knowledge/creation-layers-panel-e8-bump.md` (also prior E7 / layers bumps)
