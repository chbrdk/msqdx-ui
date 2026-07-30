import type { HTMLAttributes, ReactNode } from 'react'

export type PanelProps = {
  children?: ReactNode
  className?: string
  as?: 'section' | 'div' | 'article'
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Module panel shell — specs/domain/msqdx-ui-foundation.md */
export function Panel({
  children,
  className,
  as: Tag = 'section',
  ...rest
}: PanelProps) {
  return (
    <Tag className={cx('ds-panel', 'module-panel', className)} {...rest}>
      {children}
    </Tag>
  )
}
