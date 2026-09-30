import type { HTMLAttributes, ReactNode } from 'react'
import { Hint } from './Hint'

export type FieldWellProps = {
  /** Short binding role (Value, Category, …) — app i18n. */
  role: ReactNode
  hint?: ReactNode
  /** Visual empty vs bound affordance (app-derived). */
  bound?: boolean
  /** Highlight while drag hovers this slot. */
  dropActive?: boolean
  children?: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'role' | 'children'>

export type FieldWellStackProps = {
  children?: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Power-BI-style bind slot — specs/domain/msqdx-ui-field-well.md */
export function FieldWell({
  role,
  hint,
  bound = false,
  dropActive = false,
  children,
  className,
  ...rest
}: FieldWellProps) {
  return (
    <div
      className={cx(
        'ds-field-well',
        !bound && 'ds-field-well--empty',
        bound && 'ds-field-well--bound',
        dropActive && 'ds-field-well--drop-active',
        className,
      )}
      data-bound={bound ? 'true' : 'false'}
      data-drop-active={dropActive ? 'true' : 'false'}
      data-testid="field-well"
      {...rest}
    >
      <div className="ds-field-well__role">{role}</div>
      <div className="ds-field-well__body">{children}</div>
      {hint ? (
        <Hint className="ds-field-well__hint">{hint}</Hint>
      ) : null}
    </div>
  )
}

/** Vertical stack of bind wells in compose / inspect panels. */
export function FieldWellStack({ children, className, ...rest }: FieldWellStackProps) {
  return (
    <div
      className={cx('ds-field-well-stack', className)}
      data-testid="field-well-stack"
      {...rest}
    >
      {children}
    </div>
  )
}
