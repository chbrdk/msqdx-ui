# MSQDX UI — ContextMenu

**Status:** Accepted  
**Layer:** Molecules  
**Contracts:** `@msqdx/ui` — `ContextMenu`  
**Related:** [`msqdx-ui-flyout.md`](./msqdx-ui-flyout.md) · [`flow-board-chrome.md`](./flow-board-chrome.md)

## Purpose

Generic **pointer-positioned action menu** for right-click / long-press authoring (flow boards, lists, tables). Apps own **items + handlers**; this package owns chrome, keyboard, and close behaviour.

Not a page Dialog, not a Flyout (icon-anchored), not app-domain actions.

## API

```ts
type ContextMenuItem = {
  id: string
  label: string
  shortcut?: string
  disabled?: boolean
  danger?: boolean
  onSelect: () => void
}

type ContextMenuProps = {
  open: boolean
  x: number
  y: number
  onClose: () => void
  items: ContextMenuItem[]
  /** Accessible name for the menu. */
  label?: string
  className?: string
}
```

Controlled only. Portal-free: `position: fixed` at `(x, y)` (clamp later if needed). When `open` becomes true, focus the first enabled item.

## Behaviour

- Escape and outside pointer down → `onClose`
- ArrowUp / ArrowDown move focus among enabled items; Enter activates
- Selecting an enabled item runs `onSelect` then `onClose`
- Empty `items` → render nothing even if `open`
- Disabled items are not activatable

## Visual

- Classes: `.ds-context-menu`, `.ds-context-menu-item`, modifiers `--danger`, `--disabled`
- Surface: solid `--paper` / `--surface`, hairline `--line`, soft lift (same magazine language as Flyout panel — no glass glow)

## Non-goals

- Nested submenus
- Checkbox/radio groups
- Built-in clipboard / app actions
