'use client'

import type { InputHTMLAttributes } from 'react'

export type ExpressionFieldProps = {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  disabled?: boolean
  className?: string
  onFocusField?: () => void
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'value' | 'onChange' | 'disabled' | 'placeholder'
>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Path / {{ expression }} parameter field.
 * Spec: specs/domain/msqdx-ui-expression-field.md
 */
export function ExpressionField({
  label,
  value,
  onChange,
  placeholder = '{{ path }}',
  hint,
  disabled,
  className,
  onFocusField,
  id,
  ...rest
}: ExpressionFieldProps) {
  const inputId = id ?? (label ? `expr-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)
  return (
    <div className={cx('ds-expression-field', className)}>
      {label ? (
        <label className="ds-expression-field-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        type="text"
        className="ds-expression-field-input"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        {...rest}
        onFocus={(e) => {
          rest.onFocus?.(e)
          onFocusField?.()
        }}
      />
      {hint ? <p className="ds-expression-field-hint">{hint}</p> : null}
    </div>
  )
}
