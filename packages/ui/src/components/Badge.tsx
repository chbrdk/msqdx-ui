import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

export type BadgeProps = {
  children?: ReactNode
  className?: string
  tone?: BadgeTone
} & Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Compact status / count badge (not a Chip). */
export function Badge({
  children,
  className,
  tone = 'neutral',
  ...rest
}: BadgeProps) {
  return (
    <span className={cx('ds-badge', `ds-badge--${tone}`, className)} {...rest}>
      {children}
    </span>
  )
}
