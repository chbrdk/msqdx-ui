'use client'

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { ChevronDown } from 'lucide-react'
import type { FieldSize } from './Field'

export type SelectOption = {
  value: string
  label: ReactNode
  disabled?: boolean
}

export type SelectProps = {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  size?: FieldSize
  disabled?: boolean
  id?: string
  className?: string
  placeholder?: string
  'aria-label'?: string
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function optionId(listId: string, index: number): string {
  return `${listId}-opt-${index}`
}

/**
 * Custom select (listbox) — specs/domain/msqdx-ui-field.md
 * Product filters/forms must not use native OS `<select>` chrome.
 */
export function Select({
  options = [],
  value: valueProp,
  defaultValue,
  onChange,
  size = 'sm',
  disabled = false,
  id,
  className,
  placeholder = '—',
  'aria-label': ariaLabel,
}: SelectProps) {
  const autoId = useId()
  const triggerId = id ?? autoId
  const listId = `${triggerId}-list`
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '')
  const controlled = valueProp !== undefined
  const value = controlled ? valueProp : uncontrolled

  const selectedIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [options, value],
  )
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined

  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, selectedIndex),
  )

  const close = useCallback(() => setOpen(false), [])

  const commit = useCallback(
    (next: string) => {
      if (!controlled) setUncontrolled(next)
      onChange?.(next)
      setOpen(false)
    },
    [controlled, onChange],
  )

  const openMenu = useCallback(() => {
    if (disabled) return
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled(options, 0))
    setOpen(true)
  }, [disabled, options, selectedIndex])

  useEffect(() => {
    if (!open) return
    function onDocPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', onDocPointer)
    return () => document.removeEventListener('mousedown', onDocPointer)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  function moveActive(delta: number) {
    if (!options.length) return
    let i = activeIndex
    for (let step = 0; step < options.length; step += 1) {
      i = (i + delta + options.length) % options.length
      if (!options[i]?.disabled) {
        setActiveIndex(i)
        return
      }
    }
  }

  function onTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!open) openMenu()
        else moveActive(1)
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) openMenu()
        else moveActive(-1)
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          setActiveIndex(firstEnabled(options, 0))
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          setActiveIndex(firstEnabled(options, options.length - 1, -1))
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!open) openMenu()
        else {
          const opt = options[activeIndex]
          if (opt && !opt.disabled) commit(opt.value)
        }
        break
      case 'Escape':
        if (open) {
          e.preventDefault()
          close()
        }
        break
      default:
        break
    }
  }

  const activeDesc =
    open && options[activeIndex] ? optionId(listId, activeIndex) : undefined

  return (
    <div
      ref={rootRef}
      className={cx('ds-select', `ds-select--${size}`, open && 'ds-select--open', className)}
    >
      <button
        type="button"
        id={triggerId}
        className={cx('ds-select-trigger', `ds-select-trigger--${size}`)}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={activeDesc}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="ds-select-value">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className="ds-select-caret"
          size={14}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id={listId}
          className="ds-select-menu"
          role="listbox"
          tabIndex={-1}
        >
          {options.map((opt, i) => {
            const selectedOpt = opt.value === value
            const active = i === activeIndex
            return (
              <li
                key={opt.value}
                id={optionId(listId, i)}
                role="option"
                aria-selected={selectedOpt}
                aria-disabled={opt.disabled || undefined}
                className={cx(
                  'ds-select-option',
                  selectedOpt && 'ds-select-option--selected',
                  active && 'ds-select-option--active',
                  opt.disabled && 'ds-select-option--disabled',
                )}
                onMouseEnter={() => {
                  if (!opt.disabled) setActiveIndex(i)
                }}
                onMouseDown={(e) => {
                  // keep focus on trigger; avoid blur-before-click
                  e.preventDefault()
                }}
                onClick={() => {
                  if (!opt.disabled) commit(opt.value)
                }}
              >
                {opt.label}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

function firstEnabled(
  options: SelectOption[],
  start: number,
  dir: 1 | -1 = 1,
): number {
  if (!options.length) return 0
  let i = start
  for (let n = 0; n < options.length; n += 1) {
    const idx = (i + options.length) % options.length
    if (!options[idx]?.disabled) return idx
    i += dir
  }
  return Math.max(0, Math.min(start, options.length - 1))
}
