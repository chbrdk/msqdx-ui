import type { HTMLAttributes } from 'react'
import { MsqdxCornerBox } from '../brand/MsqdxCornerBox'
import {
  BOTTOM_LEFT_SHELL_CORNERS,
  BOTTOM_RIGHT_SHELL_CORNERS,
  MSQDX_SHELL_CORNER_RADIUS,
  TOP_LEFT_SHELL_CORNERS,
} from '../brand/msqdxCutdown'

export type ShellCornersProps = {
  borderRadius?: number
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Viewport corner ornaments at TL / BL / BR — one concave cutdown each.
 * Top-right is reserved for `BrandCorner`.
 */
export function ShellCorners({
  borderRadius = MSQDX_SHELL_CORNER_RADIUS,
  className,
  ...rest
}: ShellCornersProps) {
  return (
    <div
      className={cx('shell-corners', className)}
      data-testid="shell-corners"
      aria-hidden
      {...rest}
    >
      <div className="shell-corner shell-corner--top-left">
        <MsqdxCornerBox
          className="shell-corner-box"
          borderRadius={borderRadius}
          topLeft={TOP_LEFT_SHELL_CORNERS.topLeft}
          topRight={TOP_LEFT_SHELL_CORNERS.topRight}
          bottomLeft={TOP_LEFT_SHELL_CORNERS.bottomLeft}
          bottomRight={TOP_LEFT_SHELL_CORNERS.bottomRight}
          style={{ width: 0, height: borderRadius }}
        />
      </div>
      <div className="shell-corner shell-corner--bottom-left">
        <MsqdxCornerBox
          className="shell-corner-box"
          borderRadius={borderRadius}
          topLeft={BOTTOM_LEFT_SHELL_CORNERS.topLeft}
          topRight={BOTTOM_LEFT_SHELL_CORNERS.topRight}
          bottomLeft={BOTTOM_LEFT_SHELL_CORNERS.bottomLeft}
          bottomRight={BOTTOM_LEFT_SHELL_CORNERS.bottomRight}
          style={{ width: 0, height: borderRadius }}
        />
      </div>
      <div className="shell-corner shell-corner--bottom-right">
        <MsqdxCornerBox
          className="shell-corner-box"
          borderRadius={borderRadius}
          topLeft={BOTTOM_RIGHT_SHELL_CORNERS.topLeft}
          topRight={BOTTOM_RIGHT_SHELL_CORNERS.topRight}
          bottomLeft={BOTTOM_RIGHT_SHELL_CORNERS.bottomLeft}
          bottomRight={BOTTOM_RIGHT_SHELL_CORNERS.bottomRight}
          style={{ width: 0, height: borderRadius }}
        />
      </div>
    </div>
  )
}
