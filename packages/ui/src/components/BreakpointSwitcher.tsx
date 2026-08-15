'use client'

import {
  useCallback,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

export type EditorBreakpoint = 'mobile' | 'tablet' | 'desktop' | 'print'

export type BreakpointSwitcherProps = {
  value: EditorBreakpoint
  onChange: (value: EditorBreakpoint) => void
  /** Partial label overrides for each breakpoint. */
  labels?: Partial<Record<EditorBreakpoint, ReactNode>>
  /** Subset / order of breakpoints (default mobile → tablet → desktop). */
  options?: EditorBreakpoint[]
  className?: string
  'aria-label'?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'onChange' | 'children'>

const DEFAULT_OPTIONS: EditorBreakpoint[] = ['mobile', 'tablet', 'desktop']

const DEFAULT_LABELS: Record<EditorBreakpoint, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
  print: 'Print',
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Mobile / tablet / desktop (/ optional print) segmented control for editor preview chrome. */
export function BreakpointSwitcher({
  value,
  onChange,
  labels,
  options = DEFAULT_OPTIONS,
  className,
  'aria-label': ariaLabel = 'Breakpoint',
  ...rest
}: BreakpointSwitcherProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  const focusAt = useCallback((index: number) => {
    const el = refs.current[index]
    el?.focus()
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const idx = options.indexOf(value)
    const last = options.length - 1
    let next = idx
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = idx < 0 ? 0 : (idx + 1) % options.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = idx < 0 ? last : (idx - 1 + options.length) % options.length
    } else if (event.key === 'Home') {
      next = 0
    } else if (event.key === 'End') {
      next = last
    }
    const nextValue = options[next]
    if (nextValue) {
      onChange(nextValue)
      focusAt(next)
    }
  }

  return (
    <div
      className={cx('ds-breakpoint-switcher', className)}
      role="radiogroup"
      aria-label={ariaLabel}
      data-testid="breakpoint-switcher"
      onKeyDown={onKeyDown}
      {...rest}
    >
      {options.map((bp, index) => {
        const checked = value === bp
        const label = labels?.[bp] ?? DEFAULT_LABELS[bp]
        return (
          <button
            key={bp}
            type="button"
            role="radio"
            aria-checked={checked}
            data-testid={`breakpoint-switcher-${bp}`}
            className={cx(
              'ds-breakpoint-switcher__btn',
              checked && 'ds-breakpoint-switcher__btn--selected',
            )}
            tabIndex={checked ? 0 : -1}
            ref={(el) => {
              refs.current[index] = el
            }}
            onClick={() => onChange(bp)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
