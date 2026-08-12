# ComponentPalette

Clickable and draggable type list for composition editors.

## API

- `onAdd(id)` — click insert
- Drag MIME `COMPONENT_PALETTE_DND_MIME` (`application/x-msqdx-component-palette-type`) — data is the item id
- Optional `onItemDragStart(id, event)` for extra payload

## Spec

`specs/domain/msqdx-ui-component-palette.md`
