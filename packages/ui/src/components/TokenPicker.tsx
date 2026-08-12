'use client'

import { useEffect, useRef, useState, type HTMLAttributes } from 'react'

export type TokenPickerOption = {
  path: string
  label?: string
  /** Display-only CSS color for swatch; not written as the value. */
  preview?: string
}

export type TokenPickerVariant = 'compact' | 'list'

export type TokenPickerProps = {
  className?: string
  options: TokenPickerOption[]
  value?: string | null
  onChange?: (path: string) => void
  /** Clear binding affordance — apps map to clear_token_binding (not onChange('')). */
  onClear?: () => void
  clearLabel?: string
  /** Include a none/empty option that invokes onClear. */
  allowNone?: boolean
  noneLabel?: string
  /** Show −/+ on the current strip to cycle prev/next through options (token paths only). */
  allowCycle?: boolean
  prevLabel?: string
  nextLabel?: string
  label?: string
  /**
   * `compact` (default): Penpot strip; option list is a popover.
   * `list`: always-open dense list (Storybook / debug).
   */
  variant?: TokenPickerVariant
  'aria-label'?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'onChange'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function cycleIndex(value: string | null, options: TokenPickerOption[]): number {
  if (!value) return -1
  return options.findIndex((opt) => opt.path === value)
}

/** Interactive token path picker — values are token paths only (no free CSS entry). */
export function TokenPicker({
  className,
  options,
  value = null,
  onChange,
  onClear,
  clearLabel = 'Clear',
  allowNone = false,
  noneLabel = 'None',
  allowCycle = false,
  prevLabel = 'Previous token',
  nextLabel = 'Next token',
  label = 'Token',
  variant = 'compact',
  'aria-label': ariaLabel = 'Token picker',
  ...rest
}: TokenPickerProps) {
  const selectedOption = value ? options.find((opt) => opt.path === value) : undefined
  const showClear = Boolean(onClear && value)
  const index = cycleIndex(value, options)
  const compact = variant === 'compact'
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!compact || !open) return
    const onDoc = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [compact, open])

  const step = (direction: -1 | 1) => {
    if (options.length === 0) return
    if (direction === 1) {
      if (index < 0) {
        onChange?.(options[0]!.path)
        return
      }
      if (index >= options.length - 1) {
        if (allowNone) onClear?.()
        return
      }
      onChange?.(options[index + 1]!.path)
      return
    }
    if (index < 0) {
      onChange?.(options[options.length - 1]!.path)
      return
    }
    if (index === 0) {
      if (allowNone) onClear?.()
      return
    }
    onChange?.(options[index - 1]!.path)
  }

  const pick = (path: string | null) => {
    if (path == null) onClear?.()
    else onChange?.(path)
    if (compact) setOpen(false)
  }

  const list = (
    <ul className="ds-token-picker__list" role="listbox" aria-label={ariaLabel} hidden={compact && !open}>
      {allowNone ? (
        <li>
          <button
            type="button"
            role="option"
            aria-selected={!value}
            className={cx('ds-token-picker__option', !value && 'ds-token-picker__option--selected')}
            onClick={() => pick(null)}
          >
            <span className="ds-token-picker__swatch ds-token-picker__swatch--empty" aria-hidden />
            <span className="ds-token-picker__path">{noneLabel}</span>
          </button>
        </li>
      ) : null}
      {options.map((opt) => {
        const selected = value === opt.path
        return (
          <li key={opt.path}>
            <button
              type="button"
              role="option"
              aria-selected={selected}
              className={cx(
                'ds-token-picker__option',
                selected && 'ds-token-picker__option--selected',
              )}
              onClick={() => pick(opt.path)}
            >
              {opt.preview ? (
                <span
                  className="ds-token-picker__swatch"
                  style={{ background: opt.preview }}
                  aria-hidden
                />
              ) : (
                <span className="ds-token-picker__swatch ds-token-picker__swatch--empty" aria-hidden />
              )}
              <span className="ds-token-picker__path">{opt.label ?? opt.path}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div
      ref={rootRef}
      className={cx(
        'ds-token-picker',
        compact ? 'ds-token-picker--compact' : 'ds-token-picker--list',
        compact && open && 'ds-token-picker--open',
        className,
      )}
      aria-label={ariaLabel}
      {...rest}
    >
      <div className="ds-token-picker__label">{label}</div>

      <div className="ds-token-picker__current">
        <button
          type="button"
          className="ds-token-picker__trigger"
          data-testid="token-picker-trigger"
          aria-expanded={compact ? open : undefined}
          aria-haspopup={compact ? 'listbox' : undefined}
          aria-label={label}
          onClick={() => {
            if (compact) setOpen((next) => !next)
          }}
        >
          {selectedOption?.preview ? (
            <span
              className="ds-token-picker__swatch"
              style={{ background: selectedOption.preview }}
              aria-hidden
            />
          ) : (
            <span className="ds-token-picker__swatch ds-token-picker__swatch--empty" aria-hidden />
          )}
          <span className="ds-token-picker__path" data-testid="token-picker-value">
            {value ?? noneLabel}
          </span>
        </button>
        {allowCycle ? (
          <span className="ds-token-picker__cycle">
            <button
              type="button"
              className="ds-token-picker__cycle-btn"
              aria-label={prevLabel}
              onClick={() => step(-1)}
            >
              −
            </button>
            <button
              type="button"
              className="ds-token-picker__cycle-btn"
              aria-label={nextLabel}
              onClick={() => step(1)}
            >
              +
            </button>
          </span>
        ) : null}
        {showClear ? (
          <button
            type="button"
            className="ds-token-picker__clear"
            aria-label={clearLabel}
            onClick={() => onClear?.()}
          >
            ×
          </button>
        ) : null}
      </div>

      {list}
    </div>
  )
}
