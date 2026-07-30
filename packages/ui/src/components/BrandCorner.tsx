import type { HTMLAttributes, ReactNode } from 'react'
import { MsqdxCornerBox } from '../brand/MsqdxCornerBox'
import { MsqdxLogoMark } from '../brand/MsqdxLogoMark'
import { TOP_RIGHT_BRAND_CORNERS, type CornerKey, type CornerStyle } from '../brand/msqdxCutdown'

export type BrandCornerProps = {
  label: ReactNode
  mark?: ReactNode
  showLogo?: boolean
  borderRadius?: number
  corners?: Record<CornerKey, CornerStyle>
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function BrandCorner({
  label,
  mark,
  showLogo = true,
  borderRadius = 32,
  corners = TOP_RIGHT_BRAND_CORNERS,
  className,
  ...rest
}: BrandCornerProps) {
  const logoMark = mark ?? <MsqdxLogoMark size={22} />

  return (
    <div className={cx('brand-corner', className)} data-testid="brand-corner" {...rest}>
      <MsqdxCornerBox
        className="brand-corner-box"
        borderRadius={borderRadius}
        topLeft={corners.topLeft}
        topRight={corners.topRight}
        bottomLeft={corners.bottomLeft}
        bottomRight={corners.bottomRight}
      >
        <div className="brand-corner-inner">
          {showLogo ? (
            <>
              <span className="brand-corner-mark" aria-hidden="true">{logoMark}</span>
              <span className="brand-corner-divider" aria-hidden="true" />
            </>
          ) : null}
          <span className="brand-corner-label">{label}</span>
        </div>
      </MsqdxCornerBox>
    </div>
  )
}
