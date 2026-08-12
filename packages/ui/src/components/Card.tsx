import type { HTMLAttributes, ReactNode } from 'react'

export type CardProps = {
  children?: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section'
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Composition surface card — distinct from EntityCard / CardActions. */
export function Card({
  children,
  className,
  as: Tag = 'div',
  ...rest
}: CardProps) {
  return (
    <Tag className={cx('ds-card', className)} {...rest}>
      {children}
    </Tag>
  )
}
