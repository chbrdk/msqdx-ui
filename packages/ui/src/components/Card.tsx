import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import {
  clipPathFromCornerInsets,
  type CornerInsets,
} from '../lib/clip-path-from-corner-insets'

export type CardProps = {
  children?: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section'
  /** Corner insets → CSS clip-path (see `clipPathFromCornerInsets`). */
  clipInset?: CornerInsets
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Composition surface card — distinct from EntityCard / CardActions. */
export function Card({
  children,
  className,
  as: Tag = 'div',
  clipInset,
  style,
  ...rest
}: CardProps) {
  const clipPath = clipPathFromCornerInsets(clipInset)
  return (
    <Tag
      className={cx('ds-card', className)}
      style={{
        ...(clipPath ? { clipPath } : null),
        ...(style as CSSProperties | undefined),
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export type { CornerInsets }
