import type { HTMLAttributes, ReactNode } from 'react'

export type FilterRowProps = {
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Filter / toolbar chip row — specs/domain/msqdx-ui-foundation.md */
export function FilterRow({ children, className, ...rest }: FilterRowProps) {
  return (
    <div
      className={cx('ds-filter-row', 'filter-row', 'toolbar-filters', 'ds-chip-row', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
