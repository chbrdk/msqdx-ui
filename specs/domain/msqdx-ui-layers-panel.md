# MSQDX UI — LayersPanel

**Status:** Accepted (CREATION E6 chrome) — 2026-08-12 · reorder polish E7  
**Layer:** Organisms  
**Consumers:** creation-v3 `/editor` left rail (`specs/domain/editor-workspace.md`)  
**Related:** `msqdx-ui-creation-editor-chrome.md` · `msqdx-ui-component-palette.md` · `schema-tree.md`

## Purpose

Generic **scene / composition layers tree** chrome for design editors. Apps map their domain nodes (e.g. `CompositionScene` tree) into `{ id, label, type?, children? }` items. The primitive handles selection highlight, nested indentation, expand/collapse for branches, and optional **sibling reorder** callbacks — not scene persistence or hide/lock.

## Non-goals

- Scene persistence, drag-and-drop reorder, rename, hide/lock (app follow-ups).
- CREATION / Plexon IDs or routes inside `@msqdx/ui`.
- Replacing `SchemaTree` / `JsonTree` (flow / data browsers stay separate).
- Mutating `items` inside the primitive — reorder callbacks notify; apps update the tree.

## API

| Prop | Notes |
|------|--------|
| `items` | Root-level `LayersPanelItem[]` (often a single root) |
| `selectedId` | Currently selected item id (or `null`) |
| `onSelect` | `(id: string) => void` when a row is activated |
| `onMoveUp` | Optional `(id: string) => void` — move among siblings toward list start |
| `onMoveDown` | Optional `(id: string) => void` — move among siblings toward list end |
| `onReorder` | Optional `(id: string, direction: 'up' \| 'down') => void` — alternative to up/down pair; used when the matching directional prop is omitted |
| `title` | Panel header (default `Layers`) |
| `emptyLabel` | Shown when `items` is empty (default `No layers`) |
| `defaultExpanded` | When true (default), branches with children start expanded |
| `aria-label` | Default `Layers panel` |

### Item shape

```ts
type LayersPanelItem = {
  id: string
  label: string
  /** Optional type meta (e.g. Stack, Text) shown beside the label. */
  type?: string
  children?: LayersPanelItem[]
}
```

## Behaviour

- Clicking a row calls `onSelect(id)` (does not toggle expand).
- Branches with `children` show a chevron; chevron toggles expand/collapse only.
- Collapse state is **uncontrolled / session-local** inside the primitive for v1 (apps may remount to reset).
- Selected row uses `aria-current="true"` and a selected style class.
- Depth indentation via inline padding (token-friendly rem steps).
- When `onMoveUp` / `onMoveDown` / `onReorder` is provided, each row shows move affordances; first sibling disables up, last disables down. Prefer directional props when both `onMoveUp`/`onMoveDown` and `onReorder` exist.

## Accessibility

- Root is `<nav>` with `aria-label`.
- Tree uses nested lists; chevrons expose `aria-expanded`.
- Row buttons are keyboard-activatable.
- Move buttons have clear accessible names (`Move up` / `Move down`).

## Acceptance

1. Stories: Default tree, Nested, Selected, Empty, WithReorder.
2. Tests: select calls `onSelect`; nested children render; empty label; expand toggles children visibility; move callbacks fire / edge disabled.
3. Consuming apps import `LayersPanel` from `@msqdx/ui` and map scene → `items`.
