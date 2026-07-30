import type { HTMLAttributes, ReactNode } from 'react'

export type StatLedeTone = 'default' | 'pos' | 'low' | 'neg' | 'ok' | 'choice'

export type StatLedeProps = {
  value: ReactNode
  label: ReactNode
  unit?: ReactNode
  tone?: StatLedeTone
  kind?: 'number' | 'text' | 'empty'
  className?: string
} & Omit<HTMLAttributes<HTMLLIElement>, 'className' | 'children'>

export type StatLedeGroupProps = {
  children: ReactNode
  columns?: number
  className?: string
  'aria-label'?: string
} & Omit<HTMLAttributes<HTMLUListElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Large display numeral + uppercase label (magazine lede / Soft-Q). */
export function StatLede({
  value,
  label,
  unit,
  tone = 'default',
  kind = 'number',
  className,
  ...rest
}: StatLedeProps) {
  return (
    <li
      className={cx('ds-stat-lede', className)}
      data-tone={tone}
      data-kind={kind}
      {...rest}
    >
      <strong
        className={cx(
          kind === 'text' ? 'ds-stat-lede-choice' : 'ds-stat-lede-num',
          kind !== 'text' && 'ds-text-numeric',
        )}
      >
        {value}
        {unit != null && kind !== 'text' ? (
          <span className="ds-stat-lede-unit">{unit}</span>
        ) : null}
      </strong>
      <span className="ds-stat-lede-label">{label}</span>
    </li>
  )
}

export function StatLedeGroup({
  children,
  columns = 3,
  className,
  'aria-label': ariaLabel,
  ...rest
}: StatLedeGroupProps) {
  return (
    <ul
      className={cx('ds-stat-lede-group', className)}
      style={{ ['--ds-stat-cols' as string]: String(columns) }}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </ul>
  )
}
