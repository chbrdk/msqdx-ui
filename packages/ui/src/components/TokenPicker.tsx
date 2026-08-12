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
  label?: string
  'aria-label'?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'onChange'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
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
  label = 'Token',
  'aria-label': ariaLabel = 'Token picker',
  ...rest
}: TokenPickerProps) {
  const selectedOption = value ? options.find((opt) => opt.path === value) : undefined
  const showClear = Boolean(onClear && value)

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
