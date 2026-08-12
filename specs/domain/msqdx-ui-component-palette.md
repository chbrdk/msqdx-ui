# MSQDX UI — ComponentPalette

**Status:** Accepted — 2026-08-12  
**Layer:** Organisms  
**Consumers:** creation-v3 `/editor` (P31 drag-insert)

## Purpose

Clickable **and draggable** type list for inserting composition nodes. Apps own insert ops; this primitive only emits add + drag payload.

## API

- `items: { id, label, description?, icon? }[]`
- `onAdd?(id)` — click insert
- `onItemDragStart?(id, event)` — optional extra drag payload; MIME is always set
- `COMPONENT_PALETTE_DND_MIME` = `application/x-msqdx-component-palette-type` (data = item `id`)
- Items are `draggable`; click still fires `onAdd` when the pointer does not drag

## States

- Default list
- Dragging (browser drag image; grab cursor on the row)

## Accessibility

- `nav` with `aria-label` (default “Component palette”)
- Each type is a `Button` (keyboard click-insert remains)

## Token dependencies

- `--bg1`, `--ink`, `--line`, `--muted`

## Acceptance

1. Storybook stories cover the intended states.
2. Unit tests cover click + drag MIME.
3. Consuming apps import `ComponentPalette` from `@msqdx/ui`.
4. No scene ops / Plexon IDs inside this package.
