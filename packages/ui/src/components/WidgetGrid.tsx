import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type WidgetGridProps = {
  columns?: 2 | 3 | 4 | 6 | 12
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  children?: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

export type WidgetGridItemProps = {
  colSpan?: number
  rowSpan?: number
  children?: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Constrained dashboard widget layout — specs/domain/msqdx-ui-widget-grid.md */
export function WidgetGrid({
  columns = 12,
  gap = 'md',
  children,
  className,
  style,
  ...rest
}: WidgetGridProps) {
  return (
    <div
      className={cx('ds-widget-grid', `ds-widget-grid--gap-${gap}`, className)}
      style={
        {
          ...style,
          '--ds-widget-grid-cols': String(columns),
        } as CSSProperties
      }
      data-columns={columns}
      {...rest}
    >
      {children}
    </div>
  )
}

function WidgetGridItem({
  colSpan = 4,
  rowSpan = 1,
  children,
  className,
  style,
  ...rest
}: WidgetGridItemProps) {
  return (
    <div
      className={cx('ds-widget-grid__item', className)}
      style={
        {
          ...style,
          '--ds-widget-col-span': String(Math.max(1, colSpan)),
          '--ds-widget-row-span': String(Math.max(1, rowSpan)),
        } as CSSProperties
      }
      data-col-span={colSpan}
      data-row-span={rowSpan}
      {...rest}
    >
      {children}
    </div>
  )
}

WidgetGrid.Item = WidgetGridItem
