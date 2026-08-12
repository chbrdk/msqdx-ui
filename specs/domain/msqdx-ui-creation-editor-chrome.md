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
| `LayersPanel` | Organisms | Scene structure tree (select / expand / collapse; optional sibling move) |
| `TokenPicker` | Molecules | Token-path pick (+ optional clear / none / −/+ cycle); no raw CSS entry |

## Density (inspect)

- Inspector body stacks `InspectSection` blocks (Penpot-like section chrome).
- Token fields: swatch + path + optional `onClear` / `allowNone` / `allowCycle` (−/+) — values are token paths only.
- Apps own field catalogs; UI never invents free `#hex` / `px` inputs.

## Rules

- Keep **generic** — no creation routes, no Plexon IDs inside ui package.
- Stories + tests required (`pnpm ds:add` shape).
- Apps own scene state and control mapping.

## Non-goals

- Full Figma-class canvas physics
- Flow-board domain (separate `FlowBoard*`)
- Porting Zaoly `App.tsx` / product-only chrome
