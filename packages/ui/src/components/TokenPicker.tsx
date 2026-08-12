import type { HTMLAttributes } from 'react'

export type TokenPickerOption = {
  path: string
  label?: string
  preview?: string
}

export type TokenPickerProps = {
  className?: string
  options: TokenPickerOption[]
  value?: string | null
  onChange?: (path: string) => void
  label?: string
  'aria-label'?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'onChange'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Interactive token path picker (beyond read-only SwatchStrip). */
export function TokenPicker({
  className,
  options,
  value = null,
  onChange,
  label = 'Token',
  'aria-label': ariaLabel = 'Token picker',
  ...rest
}: TokenPickerProps) {
  return (
    <div className={cx('ds-token-picker', className)} aria-label={ariaLabel} {...rest}>
      <div className="ds-token-picker__label">{label}</div>
      <ul className="ds-token-picker__list" role="listbox" aria-label={ariaLabel}>
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
                ) : null}
                <span className="ds-token-picker__path">{opt.label ?? opt.path}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
