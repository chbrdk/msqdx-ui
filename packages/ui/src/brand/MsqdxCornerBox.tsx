import type { CSSProperties, ReactNode } from 'react'
import {
  CUTDOWN_DEFS,
  getCutdownVariant,
  getRadius,
  isCutdown,
  cutdownMaskImage,
  type CornerKey,
  type CornerStyle,
} from './msqdxCutdown'

export type MsqdxCornerBoxProps = {
  topLeft?: CornerStyle
  topRight?: CornerStyle
  bottomLeft?: CornerStyle
  bottomRight?: CornerStyle
  borderRadius?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

function CutdownPatch({
  corner,
  variant,
  radiusPx,
}: {
  corner: CornerKey
  variant: 'a' | 'b'
  radiusPx: number
}) {
  const def = CUTDOWN_DEFS[corner][variant]
  const mask = cutdownMaskImage(def.maskCircle, radiusPx)
  const pos = def.position(radiusPx)
  return (
    <span
      aria-hidden
      className="msqdx-cutdown-patch"
      style={{
        position: 'absolute',
        width: radiusPx,
        height: radiusPx,
        top: pos.top,
        right: pos.right,
        bottom: pos.bottom,
        left: pos.left,
        background: 'inherit',
        pointerEvents: 'none',
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskPosition: '0 0',
        maskPosition: '0 0',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    />
  )
}

export function MsqdxCornerBox({
  topLeft = 'rounded',
  topRight = 'rounded',
  bottomLeft = 'rounded',
  bottomRight = 'rounded',
  borderRadius = 32,
  className,
  style,
  children,
}: MsqdxCornerBoxProps) {
  const corners: { key: CornerKey; style: CornerStyle }[] = [
    { key: 'topLeft', style: topLeft },
    { key: 'topRight', style: topRight },
    { key: 'bottomLeft', style: bottomLeft },
    { key: 'bottomRight', style: bottomRight },
  ]
  const cutdowns = corners.filter((c) => isCutdown(c.style)) as {
    key: CornerKey
    style: 'cutdown-a' | 'cutdown-b'
  }[]

  return (
    <div
      className={['msqdx-corner-box', className].filter(Boolean).join(' ')}
      style={{
        position: 'relative',
        overflow: 'visible',
        borderTopLeftRadius: getRadius(topLeft, borderRadius),
        borderTopRightRadius: getRadius(topRight, borderRadius),
        borderBottomLeftRadius: getRadius(bottomLeft, borderRadius),
        borderBottomRightRadius: getRadius(bottomRight, borderRadius),
        ...style,
      }}
    >
      {cutdowns.map(({ key, style: cornerStyle }) => (
        <CutdownPatch
          key={`${key}-${cornerStyle}`}
          corner={key}
          variant={getCutdownVariant(cornerStyle)}
          radiusPx={borderRadius}
        />
      ))}
      {children}
    </div>
  )
}
