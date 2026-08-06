import type { HTMLAttributes } from 'react'
import { MsqdxCornerBox } from '../brand/MsqdxCornerBox'
import {
  BOTTOM_LEFT_SHELL_CORNERS,
  BOTTOM_RIGHT_SHELL_CORNERS,
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
 * Viewport cutdown ornaments at TL / BL / BR.
 * Top-right is reserved for `BrandCorner`.
 */
export function ShellCorners({
  borderRadius = 32,
  className,
  ...rest
}: ShellCornersProps) {
  const size = borderRadius

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
          style={{ width: size, height: size }}
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
          style={{ width: size, height: size }}
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
          style={{ width: size, height: size }}
        />
      </div>
    </div>
  )
}
