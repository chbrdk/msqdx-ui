# MSQDX UI — ContextMenu

**Status:** Accepted  
**Layer:** Molecules  
**Contracts:** `@msqdx/ui` — `ContextMenu`  
**Related:** [`msqdx-ui-flyout.md`](./msqdx-ui-flyout.md) · [`flow-board-chrome.md`](./flow-board-chrome.md)

## Purpose

Generic **pointer-positioned action menu** for right-click / long-press authoring (flow boards, lists, tables, timeline). Apps own **items + handlers**; this package owns chrome, keyboard, and close behaviour.

Not a page Dialog, not a Flyout (icon-anchored), not app-domain actions.

## API

```ts
type ContextMenuItem = {
  id: string
  label: string
  shortcut?: string
  disabled?: boolean
  danger?: boolean
  /** Optional leading icon (app supplies `@msqdx/ui` Icon*). */
  icon?: ReactNode
  /** Optional `data-testid` on the menuitem button (e.g. editor topbar menus). */
  testId?: string
  /** Hairline rule before this row. */
  separator?: boolean
  /** Non-interactive group label (uses `label`; skips keyboard activation). */
  section?: boolean
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

Controlled only. Portal-free: `position: fixed` at `(x, y)`. WHEN `open` becomes true THEN focus the first enabled **action** item (skip `section` rows).

## Behaviour

- Escape and outside pointer down → `onClose`
- ArrowUp / ArrowDown move focus among enabled action items; Enter activates
- Selecting an enabled action item runs `onSelect` then `onClose`
- Empty `items` → render nothing even if `open`
- Disabled items are not activatable
- `section: true` rows are not `menuitem`s and MUST NOT run `onSelect`
- WHEN `separator: true` THEN a hairline MUST render before that row

## Visual

- Classes: `.ds-context-menu`, `.ds-context-menu-item`, modifiers `--danger`, `--disabled`
- Icon slot: `.ds-context-menu-item__icon` (leading, `currentColor`)
- Section: `.ds-context-menu-section`
- Separator: `.ds-context-menu-separator`
- Surface: solid `--paper` / `--surface`, hairline `--line`, soft lift (same magazine language as Flyout panel — no glass glow)
- Corners: soft panel radius (`--radius-panel`, not theme `--radius` which can be 0 / hairline)
- Type: compact body (`~0.75rem`); shortcuts slightly smaller / muted; denser item padding than default body text

## Non-goals

- Nested submenus
- Checkbox/radio groups
- Built-in clipboard / app actions
