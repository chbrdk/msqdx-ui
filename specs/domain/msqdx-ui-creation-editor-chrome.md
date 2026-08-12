# MSQDX UI — CREATION editor chrome

**Status:** Accepted (Wave E3) — 2026-08-12  
**Consumers:** creation-v3 `/editor` · Storybook organisms  
**Program:** creation-v3 `specs/domain/editor-migration.md`

## Primitives

| Name | Layer | Role |
|------|-------|------|
| `CanvasViewport` | Organisms | Pan/zoom artboard host; children = scene |
| `SelectionHandles` | Molecules | Bounding box + resize affordances (visual) |
| `PropertyInspector` | Organisms | Prop list shell; app supplies fields |
| `ComponentPalette` | Organisms | Draggable/clickable type list |
| `TokenPicker` | Molecules | Pick token path for bindings |

## Rules

- Keep **generic** — no creation routes, no Plexon IDs inside ui package.
- Stories + tests required (`pnpm ds:add` shape).
- Apps own scene state and control mapping.

## Non-goals

- Full Figma-class canvas physics
- Flow-board domain (separate `FlowBoard*`)
