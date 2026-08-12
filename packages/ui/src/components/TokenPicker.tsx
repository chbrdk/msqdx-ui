import type { HTMLAttributes } from 'react'

export type TokenPickerOption = {
  path: string
  label?: string
  /** Display-only CSS color for swatch; not written as the value. */
  preview?: string
}

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
  'aria-label': ariaLabel = 'Token picker',
  ...rest
}: TokenPickerProps) {
  const selectedOption = value ? options.find((opt) => opt.path === value) : undefined
  const showClear = Boolean(onClear && value)
  const index = cycleIndex(value, options)

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
    // prev
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

  return (
    <div className={cx('ds-token-picker', className)} aria-label={ariaLabel} {...rest}>
      <div className="ds-token-picker__label">{label}</div>

      <div className="ds-token-picker__current">
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

      <ul className="ds-token-picker__list" role="listbox" aria-label={ariaLabel}>
        {allowNone ? (
          <li>
            <button
              type="button"
              role="option"
              aria-selected={!value}
              className={cx(
                'ds-token-picker__option',
                !value && 'ds-token-picker__option--selected',
              )}
              onClick={() => onClear?.()}
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
                onClick={() => onChange?.(opt.path)}
              >
                {opt.preview ? (
                  <span
                    className="ds-token-picker__swatch"
                    style={{ background: opt.preview }}
                    aria-hidden
                  />
                ) : (
                  <span
                    className="ds-token-picker__swatch ds-token-picker__swatch--empty"
                    aria-hidden
                  />
                )}
                <span className="ds-token-picker__path">{opt.label ?? opt.path}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
