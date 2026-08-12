# MSQDX UI — CREATION editor chrome

**Status:** Accepted (Wave E3) — 2026-08-12  
**Consumers:** creation-v3 `/editor` · Storybook organisms  
**Program:** creation-v3 `specs/domain/editor-migration.md`

## Primitives

| Name | Layer | Role |
|------|-------|------|
| `CanvasViewport` | Organisms | Pan/zoom artboard host; children = scene |
| `SelectionHandles` | Molecules | Bounding box + resize affordances (visual; optional interactive corners) |
| `PropertyInspector` | Organisms | Dense prop rail shell; app supplies fields |
| `InspectSection` | Molecules | Title + body chrome inside the inspector |
| `InspectTabs` | Molecules | Dense Design\|CSS (labels as props) tablist — no panels; compose around inspector |
| `BreakpointSwitcher` | Molecules | Mobile / tablet / desktop segmented control for preview width |
| `ComponentPalette` | Organisms | Draggable/clickable type list |
| `LayersPanel` | Organisms | Scene structure tree (select / expand / collapse; hide/lock toggles; sibling DnD + ▲▼ move) |
| `TokenPicker` | Molecules | Token-path pick (+ optional clear / none / −/+ cycle); no raw CSS entry |

## Density (inspect)

- Inspector body stacks `InspectSection` blocks (Penpot-like section chrome). Hide the organism title row (`.ds-property-inspector__head`) — tabs + sections are enough.
- Inspect Field labels inside the rail are sentence-case muted (not magazine all-caps orange).
- Token fields: compact strip (swatch + path + optional `onClear` / `allowNone` / `allowCycle`); option list is a **popover** (`variant="compact"`, default). `variant="list"` is Storybook/debug only.
- Palette buttons stack label + description (`flex-direction: column`) so names do not concatenate (`Stack` + `Top-N` ≠ `StackTop-N`). Optional `icon` on palette / layers items.
- `ToggleGroup` `variant="icon"`: square chips; `option.icon` visible, `option.label` is the accessible name.
- `Field.icon` / `TokenPicker` `icon`: leading 16px prop glyph. Apps own the name→icon map.
- Apps own field catalogs; UI never invents free `#hex` / `px` inputs.

## Rules

- Keep **generic** — no creation routes, no Plexon IDs inside ui package.
- Stories + tests required (`pnpm ds:add` shape).
- Apps own scene state and control mapping.

## Non-goals

- Full Figma-class canvas physics
- Flow-board domain (separate `FlowBoard*`)
- Porting Zaoly `App.tsx` / product-only chrome
