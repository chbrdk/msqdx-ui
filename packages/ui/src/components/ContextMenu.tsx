'use client'

import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'

export type ContextMenuItem = {
  id: string
  label: string
  shortcut?: string
  disabled?: boolean
  danger?: boolean
  onSelect: () => void
}

export type ContextMenuProps = {
  open: boolean
  x: number
  y: number
  onClose: () => void
  items: ContextMenuItem[]
  /** Accessible name for the menu. */
  label?: string
  className?: string
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Controlled pointer-positioned action menu.
 * Spec: specs/domain/msqdx-ui-context-menu.md
 */
export function ContextMenu({
  open,
  x,
  y,
  onClose,
  items,
  label = 'Context menu',
  className,
}: ContextMenuProps) {
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    if (!open) return

    const enabledIndexes = items
      .map((item, index) => (item.disabled ? -1 : index))
      .filter((index) => index >= 0)
    const first = enabledIndexes[0]
    if (first != null) {
      queueMicrotask(() => itemRefs.current[first]?.focus())
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) onClose()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onPointer)
    }
  }, [open, items, onClose])

  if (!open || items.length === 0) return null

  function focusEnabled(delta: number) {
    const enabled = items
      .map((item, index) => (item.disabled ? -1 : index))
      .filter((index) => index >= 0)
    if (enabled.length === 0) return
    const active = document.activeElement
    const current = itemRefs.current.findIndex((el) => el === active)
    const pos = enabled.indexOf(current)
    const nextPos =
      pos < 0 ? 0 : (pos + delta + enabled.length) % enabled.length
    itemRefs.current[enabled[nextPos]]?.focus()
  }

  function onMenuKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusEnabled(1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusEnabled(-1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      const first = items.findIndex((item) => !item.disabled)
      if (first >= 0) itemRefs.current[first]?.focus()
    } else if (event.key === 'End') {
      event.preventDefault()
      for (let i = items.length - 1; i >= 0; i -= 1) {
        if (!items[i]?.disabled) {
          itemRefs.current[i]?.focus()
          break
        }
      }
    }
  }

  return (
    <div
      ref={rootRef}
      id={menuId}
      role="menu"
      aria-label={label}
      className={cx('ds-context-menu', className)}
      style={{ left: x, top: y }}
      onKeyDown={onMenuKeyDown}
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          type="button"
          role="menuitem"
          disabled={item.disabled}
          className={cx(
            'ds-context-menu-item',
            item.danger && 'ds-context-menu-item--danger',
            item.disabled && 'ds-context-menu-item--disabled',
          )}
          onClick={() => {
            if (item.disabled) return
            item.onSelect()
            onClose()
          }}
        >
          <span>{item.label}</span>
          {item.shortcut ? (
            <span className="ds-context-menu-shortcut">{item.shortcut}</span>
          ) : null}
        </button>
      ))}
    </div>
  )
}
