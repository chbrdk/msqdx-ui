import type { HTMLAttributes } from 'react'

export type SelectionHandlesProps = {
  className?: string
  width?: number
  height?: number
  left?: number
  top?: number
  visible?: boolean
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Visual bounding box + corner handles (no resize math). */
export function SelectionHandles({
  className,
  width = 120,
  height = 80,
  left = 0,
  top = 0,
  visible = true,
  style,
  ...rest
}: SelectionHandlesProps) {
  if (!visible) return null
  return (
    <div
      className={cx('ds-selection-handles', className)}
      style={{ width, height, left, top, ...style }}
      data-testid="selection-handles"
      aria-hidden
      {...rest}
    >
      <span className="ds-selection-handles__corner ds-selection-handles__corner--nw" />
      <span className="ds-selection-handles__corner ds-selection-handles__corner--ne" />
      <span className="ds-selection-handles__corner ds-selection-handles__corner--sw" />
      <span className="ds-selection-handles__corner ds-selection-handles__corner--se" />
    </div>
  )
}
