# LayersPanel

Organism for CREATION / composition editor left-rail structure trees.

## Consumer mapping (creation-v3)

```ts
function toLayerItem(node: SceneNode): LayersPanelItem {
  return {
    id: node.id,
    label: node.name?.trim() || node.type,
    type: node.type,
    children: node.children?.map(toLayerItem),
  }
}

<LayersPanel
  items={[toLayerItem(scene.root)]}
  selectedId={selectedId}
  onSelect={setSelectedId}
  onMoveUp={(id) => moveSibling(id, 'up')}
  onMoveDown={(id) => moveSibling(id, 'down')}
  // or: onReorder={(id, direction) => moveSibling(id, direction)}
  title={t('editor.layers')}
/>
```

## Follow-up (app)

- Hide / lock / rename stay app-owned (Zaoly R41/R47 reference).
- Persist collapse ids in session chrome if needed — primitive is uncontrolled expand for v1.
- Drag-drop reorder remains app-owned; DS only exposes ▲▼ sibling callbacks.

## Bump

Pin: `knowledge/creation-editor-chrome-e7-bump.md` (also prior `creation-layers-panel-bump.md`)
