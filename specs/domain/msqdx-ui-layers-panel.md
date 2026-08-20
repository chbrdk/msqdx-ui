# MSQDX UI — LayersPanel

**Status:** Accepted (CREATION E6 chrome) — 2026-08-12 · reorder polish E7 · hide/lock + DnD E8 · multi-select E9 (2026-08-13)  
**Layer:** Organisms  
**Consumers:** creation-v3 `/editor` left rail (`specs/domain/editor-workspace.md`)  
**Related:** `msqdx-ui-creation-editor-chrome.md` · `msqdx-ui-component-palette.md` · `schema-tree.md`

## Purpose

Generic **scene / composition layers tree** chrome for design editors. Apps map their domain nodes (e.g. `CompositionScene` tree) into `{ id, label, type?, children?, hidden?, locked?, acceptsChildren? }` items. The primitive handles selection highlight, nested indentation, expand/collapse for branches, optional **hide/lock** row controls, optional **drag-and-drop reorder / nest**, and accessible **▲▼** move callbacks — not scene persistence or chrome JSON.

## Non-goals

- Scene persistence, rename, cascade lock semantics, or chrome JSON (`hiddenIds` / `lockedIds`) — apps own those.
- CREATION / Plexon IDs or routes inside `@msqdx/ui`.
- Replacing `SchemaTree` / `JsonTree` (flow / data browsers stay separate).
- Mutating `items` inside the primitive — callbacks notify; apps update the tree.
- Scene cycle / lock / container validation — apps reject invalid drops in `onReorderDrop`.

## API

| Prop | Notes |
|------|--------|
| `items` | Root-level `LayersPanelItem[]` (often a single root) |
| `selectedId` | Primary selected item id (or `null`) — drives `aria-current` |
| `selectedIds` | Optional full multi-selection set; every id gets selected chrome; non-primary also get `--multi-selected` |
| `onSelect` | `(id: string, mods?: { shiftKey; metaKey; ctrlKey }) => void` when a row is activated |
| `onMoveUp` | Optional `(id: string) => void` — move among siblings toward list start (a11y fallback) |
| `onMoveDown` | Optional `(id: string) => void` — move among siblings toward list end (a11y fallback) |
| `onReorder` | Optional `(id: string, direction: 'up' \| 'down') => void` — alternative to up/down pair; used when the matching directional prop is omitted |
| `onReorderDrop` | Optional `(id, targetId, position: 'before' \| 'after' \| 'into')` — DnD drop (sibling or cross-parent); enables drag affordances |
| `onToggleHidden` | Optional `(id: string) => void` — show eye control; apps flip visibility in chrome/state |
| `onToggleLocked` | Optional `(id: string) => void` — show lock control; apps flip lock in chrome/state |
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
  /** Optional leading glyph (type icon). */
  icon?: ReactNode
  /** Visual: dimmed / struck when true (canvas hide). */
  hidden?: boolean
  /** Visual: lock affordance pressed; row not draggable when true. */
  locked?: boolean
  /** When true, middle drop zone is `into` (nest). Apps set for containers. */
  acceptsChildren?: boolean
  children?: LayersPanelItem[]
}

type LayersPanelReorderDropPosition = 'before' | 'after' | 'into'
```

## Behaviour

- Clicking a row calls `onSelect(id, mods)` with pointer modifiers (does not toggle expand). Apps own additive multi-select (Shift / ⌘ / Ctrl) — canvas `selectedIds` stays SSOT.
- Branches with `children` show a chevron; chevron toggles expand/collapse only.
- Collapse state is **uncontrolled / session-local** inside the primitive for v1 (apps may remount to reset).
- Primary row (`selectedId`) uses `aria-current="true"`. Every id in `selectedIds` (or sole `selectedId`) uses the selected style; secondary multi ids also use `--multi-selected` / `data-multi-selected`.
- Depth indentation via inline padding (token-friendly rem steps).
- When `onMoveUp` / `onMoveDown` / `onReorder` is provided, each row shows move affordances; first sibling disables up, last disables down. Prefer directional props when both `onMoveUp`/`onMoveDown` and `onReorder` exist.
- When `onToggleHidden` is provided, each row shows a visibility toggle; `item.hidden` drives pressed/visual state (`aria-pressed`).
- When `onToggleLocked` is provided, each row shows a lock toggle; `item.locked` drives pressed/visual state (`aria-pressed`).
- When `onReorderDrop` is provided, non-locked rows are `draggable`. Any row may be a drop target (sibling or cross-parent). Position: `'before'` / `'after'` from pointer Y; when `acceptsChildren`, the middle third is `'into'`. Self-drops are ignored. Locked rows are not draggable. Nest/cycle validation is the app's job.
- ▲▼ remain the **accessible / single-pointer** reorder path (WCAG 2.5.7); DnD is an accelerator.

## Accessibility

- Root is `<nav>` with `aria-label`.
- Tree uses nested lists; chevrons expose `aria-expanded`.
- Row buttons are keyboard-activatable.
- Move buttons have clear accessible names (`Move up` / `Move down`).
- Hide/lock toggles: `Hide layer` / `Show layer`, `Lock layer` / `Unlock layer`, with `aria-pressed`.
- Drag uses HTML5 DnD; keyboard users keep ▲▼ (or `onReorder`).

## Acceptance

1. Stories: Default tree, Nested, Selected, Empty, WithReorder, WithHideLock, WithDragReorder.
2. Tests: select calls `onSelect` (with mods); `selectedIds` highlights primary + secondary; nested children render; empty label; expand toggles children visibility; move callbacks fire / edge disabled; hide/lock toggles fire and reflect flags; DnD drop calls `onReorderDrop` with before/after among siblings; locked not draggable.
3. Consuming apps import `LayersPanel` from `@msqdx/ui` and map scene → `items` (including `hidden` / `locked` from chrome).
