import type { HTMLAttributes, ReactNode } from 'react'
import { MsqdxCornerBox } from '../brand/MsqdxCornerBox'
import { MsqdxLogoMark } from '../brand/MsqdxLogoMark'
import { TOP_RIGHT_BRAND_CORNERS, MSQDX_SHELL_CORNER_RADIUS, type CornerKey, type CornerStyle } from '../brand/msqdxCutdown'

export type BrandCornerProps = {
  label: ReactNode
  mark?: ReactNode
  showLogo?: boolean
  /**
   * When `showLogo` is true: `hover` (default) collapses the label until hover/focus;
   * `always` keeps mark + label visible.
   */
  labelReveal?: 'hover' | 'always'
  borderRadius?: number
  corners?: Record<CornerKey, CornerStyle>
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function labelText(label: ReactNode): string | undefined {
  if (typeof label === 'string' || typeof label === 'number') return String(label)
  return undefined
}

export function BrandCorner({
  label,
  mark,
  showLogo = true,
  labelReveal = 'hover',
  borderRadius = MSQDX_SHELL_CORNER_RADIUS,
  corners = TOP_RIGHT_BRAND_CORNERS,
  className,
  ...rest
}: BrandCornerProps) {
  const logoMark = mark ?? <MsqdxLogoMark size={22} />
  const collapseLabel = Boolean(showLogo && labelReveal === 'hover')
  const accessibleName = labelText(label)

  return (
    <div
      className={cx(
        'brand-corner',
        collapseLabel && 'brand-corner--collapse-label',
        !showLogo && 'brand-corner--label-only',
        className,
      )}
      data-testid="brand-corner"
      data-label-reveal={collapseLabel ? 'hover' : 'always'}
      {...rest}
    >
      <MsqdxCornerBox
        className="brand-corner-box"
        borderRadius={borderRadius}
        topLeft={corners.topLeft}
        topRight={corners.topRight}
        bottomLeft={corners.bottomLeft}
        bottomRight={corners.bottomRight}
        tabIndex={collapseLabel ? 0 : undefined}
        aria-label={collapseLabel ? accessibleName : undefined}
      >
        <div className="brand-corner-inner">
          {showLogo ? (
            <span className="brand-corner-mark" aria-hidden="true">
              {logoMark}
            </span>
          ) : null}
          {label != null && label !== '' ? (
            <span className="brand-corner-reveal">
              <span className="brand-corner-reveal-inner">
                {showLogo ? <span className="brand-corner-divider" aria-hidden="true" /> : null}
                <span className="brand-corner-label" aria-hidden={collapseLabel || undefined}>
                  {label}
                </span>
              </span>
            </span>
          ) : null}
        </div>
      </MsqdxCornerBox>
    </div>
  )
}
