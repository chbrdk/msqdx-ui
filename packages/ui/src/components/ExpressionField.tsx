'use client'

import { useMemo, useState, type DragEvent, type InputHTMLAttributes } from 'react'
import { SCHEMA_TREE_PATH_MIME } from './SchemaTree'

export type ExpressionFieldProps = {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  disabled?: boolean
  className?: string
  onFocusField?: () => void
  /** Insert a path dragged from SchemaTree (defaults to `{{ path }}`). */
  onDropPath?: (path: string) => void
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'value' | 'onChange' | 'disabled' | 'placeholder'
>

export type ExpressionSegment =
  | { type: 'text'; value: string }
  | { type: 'expression'; value: string; raw: string }

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Split value into literal text and complete `{{ … }}` expressions. */
export function parseExpressionSegments(value: string): ExpressionSegment[] {
  if (!value) return []
  const segments: ExpressionSegment[] = []
  const re = /\{\{\s*([\s\S]*?)\s*\}\}/g
  let last = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(value)) !== null) {
    if (match.index > last) {
      segments.push({ type: 'text', value: value.slice(last, match.index) })
    }
    segments.push({
      type: 'expression',
      value: match[1]!.trim(),
      raw: match[0]!,
    })
    last = match.index + match[0]!.length
  }
  if (last < value.length) {
    segments.push({ type: 'text', value: value.slice(last) })
  }
  return segments
}

function ExpressionMirror({ value }: { value: string }) {
  const segments = useMemo(() => parseExpressionSegments(value), [value])
  const hasExpressions = segments.some((s) => s.type === 'expression')

  if (!value) return null

  return (
    <div className="ds-expression-field-mirror" aria-hidden>
      {hasExpressions
        ? segments.map((seg, i) =>
            seg.type === 'expression' ? (
              <span key={`${seg.raw}-${i}`} className="ds-expression-chip">
                {seg.value || '…'}
              </span>
            ) : (
              <span key={`t-${i}`} className="ds-expression-field-mirror-text">
                {seg.value}
              </span>
            )
          )
        : value}
    </div>
  )
}

/**
 * Path / {{ expression }} parameter field with inline expression chips.
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
  onDropPath,
  id,
  ...rest
}: ExpressionFieldProps) {
  const inputId = id ?? (label ? `expr-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)
  const [dropActive, setDropActive] = useState(false)
  const hasExpressions = useMemo(
    () => parseExpressionSegments(value).some((s) => s.type === 'expression'),
    [value]
  )

  const readDroppedPath = (event: DragEvent): string | null => {
    const path =
      event.dataTransfer.getData(SCHEMA_TREE_PATH_MIME) ||
      event.dataTransfer.getData('text/plain')
    return path.trim() || null
  }

  const acceptsPathDrop = (event: DragEvent): boolean => {
    if (disabled) return false
    const types = Array.from(event.dataTransfer.types)
    return types.includes(SCHEMA_TREE_PATH_MIME) || types.includes('text/plain')
  }

  const handleDragOver = (event: DragEvent) => {
    if (!acceptsPathDrop(event)) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    setDropActive(true)
  }

  const handleDragLeave = () => {
    setDropActive(false)
  }

  const handleDrop = (event: DragEvent) => {
    if (!acceptsPathDrop(event)) return
    event.preventDefault()
    setDropActive(false)
    const path = readDroppedPath(event)
    if (!path) return
    onFocusField?.()
    if (onDropPath) {
      onDropPath(path)
      return
    }
    onChange(path.startsWith('{{') ? path : `{{ ${path} }}`)
  }

  return (
    <div className={cx('ds-expression-field', className)}>
      {label ? (
        <label className="ds-expression-field-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div
        className={cx(
          'ds-expression-field-input-wrap',
          hasExpressions && 'ds-expression-field-input-wrap--has-expr',
          dropActive && 'ds-expression-field-input-wrap--drop-target'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <ExpressionMirror value={value} />
        <input
          id={inputId}
          type="text"
          className={cx(
            'ds-expression-field-input',
            hasExpressions && 'ds-expression-field-input--chip-overlay'
          )}
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
      </div>
      {hint ? <p className="ds-expression-field-hint">{hint}</p> : null}
    </div>
  )
}
