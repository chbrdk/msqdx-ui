/**
 * Catalog-reserve inspect layout glyphs (no required consumer yet).
 * Same optical language as InspectLayoutGlyphs / Extra / More.
 */

import type { ReactNode } from 'react'

const VIEW = 16

function Track({ children, size = VIEW }: { children: ReactNode; size?: number }) {
  return (
    <svg
      className="ui-icon ds-inspect-glyph"
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

function OuterFrame() {
  return <rect x="1.25" y="1.25" width="13.5" height="13.5" rx="2" className="ds-inspect-glyph__frame" />
}

function Pillar({
  x,
  y,
  w,
  h,
  tone = 'strong',
}: {
  x: number
  y: number
  w: number
  h: number
  tone?: 'strong' | 'soft' | 'empty'
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="0.75"
      className={`ds-inspect-glyph__cell ds-inspect-glyph__cell--${tone}`}
    />
  )
}

/** CSS visibility. */
export type VisibilityGlyphId = 'visible' | 'hidden' | 'collapse'

export function VisibilityGlyph({ id, size }: { id: VisibilityGlyphId; size?: number }) {
  if (id === 'hidden') {
    return (
      <Track size={size}>
        <OuterFrame />
        <Pillar x={4} y={4.5} w={8} h={7} tone="soft" />
        <line x1="4" y1="4" x2="12" y2="12" className="ds-inspect-glyph__accent" />
      </Track>
    )
  }
  if (id === 'collapse') {
    return (
      <Track size={size}>
        <OuterFrame />
        <Pillar x={3.5} y={7} w={9} h={2} tone="empty" />
        <line x1="5" y1="5" x2="8" y2="7" className="ds-inspect-glyph__accent" />
        <line x1="11" y1="5" x2="8" y2="7" className="ds-inspect-glyph__accent" />
        <line x1="5" y1="11" x2="8" y2="9" className="ds-inspect-glyph__accent" />
        <line x1="11" y1="11" x2="8" y2="9" className="ds-inspect-glyph__accent" />
      </Track>
    )
  }
  return (
    <Track size={size}>
      <OuterFrame />
      <Pillar x={4} y={4.5} w={8} h={7} />
    </Track>
  )
}

/** CSS box-sizing. */
export type BoxSizingGlyphId = 'content-box' | 'border-box'

export function BoxSizingGlyph({ id, size }: { id: BoxSizingGlyphId; size?: number }) {
  if (id === 'border-box') {
    return (
      <Track size={size}>
        <OuterFrame />
        <rect
          x="3"
          y="3"
          width="10"
          height="10"
          rx="1"
          className="ds-inspect-glyph__frame"
          style={{ strokeWidth: 2.25 }}
        />
        <Pillar x={5.5} y={5.5} w={5} h={5} tone="soft" />
      </Track>
    )
  }
  return (
    <Track size={size}>
      <OuterFrame />
      <rect x="3.5" y="3.5" width="9" height="9" rx="1" className="ds-inspect-glyph__frame--dotted" />
      <Pillar x={5.5} y={5.5} w={5} h={5} />
    </Track>
  )
}

/** CSS white-space. */
export type WhiteSpaceGlyphId = 'normal' | 'nowrap' | 'pre' | 'pre-wrap'

export function WhiteSpaceGlyph({ id, size }: { id: WhiteSpaceGlyphId; size?: number }) {
  if (id === 'nowrap') {
    return (
      <Track size={size}>
        <OuterFrame />
        <Pillar x={3} y={7} w={10} h={2} />
      </Track>
    )
  }
  if (id === 'pre') {
    return (
      <Track size={size}>
        <OuterFrame />
        <Pillar x={3.5} y={4} w={3} h={1.6} />
        <Pillar x={3.5} y={7} w={5} h={1.6} />
        <Pillar x={3.5} y={10} w={2} h={1.6} />
        <line x1="3.5" y1="5.8" x2="3.5" y2="6.8" className="ds-inspect-glyph__dash" />
        <line x1="3.5" y1="8.8" x2="3.5" y2="9.8" className="ds-inspect-glyph__dash" />
      </Track>
    )
  }
  if (id === 'pre-wrap') {
    return (
      <Track size={size}>
        <OuterFrame />
        <Pillar x={3.5} y={4} w={9} h={1.6} />
        <Pillar x={3.5} y={7} w={6} h={1.6} />
        <Pillar x={3.5} y={10} w={8} h={1.6} tone="soft" />
      </Track>
    )
  }
  return (
    <Track size={size}>
      <OuterFrame />
      <Pillar x={3.5} y={4.5} w={9} h={1.6} />
      <Pillar x={3.5} y={7.5} w={7} h={1.6} tone="soft" />
      <Pillar x={3.5} y={10.5} w={5} h={1.6} tone="soft" />
    </Track>
  )
}

/** CSS float. */
export type FloatGlyphId = 'none' | 'left' | 'right'

export function FloatGlyph({ id, size }: { id: FloatGlyphId; size?: number }) {
  if (id === 'left') {
    return (
      <Track size={size}>
        <OuterFrame />
        <Pillar x={3} y={3.5} w={5} h={5} />
        <Pillar x={9} y={3.5} w={4} h={1.5} tone="soft" />
        <Pillar x={9} y={5.75} w={4} h={1.5} tone="soft" />
        <Pillar x={3} y={10} w={10} h={1.5} tone="soft" />
      </Track>
    )
  }
  if (id === 'right') {
    return (
      <Track size={size}>
        <OuterFrame />
        <Pillar x={8} y={3.5} w={5} h={5} />
        <Pillar x={3} y={3.5} w={4} h={1.5} tone="soft" />
        <Pillar x={3} y={5.75} w={4} h={1.5} tone="soft" />
        <Pillar x={3} y={10} w={10} h={1.5} tone="soft" />
      </Track>
    )
  }
  return (
    <Track size={size}>
      <OuterFrame />
      <Pillar x={3.5} y={4} w={9} h={2} tone="soft" />
      <Pillar x={3.5} y={7} w={9} h={2} tone="soft" />
      <Pillar x={3.5} y={10} w={9} h={2} tone="soft" />
    </Track>
  )
}

/** CSS writing-mode. */
export type WritingModeGlyphId = 'horizontal' | 'vertical'

export function WritingModeGlyph({ id, size }: { id: WritingModeGlyphId; size?: number }) {
  if (id === 'vertical') {
    return (
      <Track size={size}>
        <OuterFrame />
        <Pillar x={6} y={3.5} w={1.6} h={3} />
        <Pillar x={8.5} y={3.5} w={1.6} h={5} />
        <Pillar x={11} y={3.5} w={1.6} h={4} tone="soft" />
      </Track>
    )
  }
  return (
    <Track size={size}>
      <OuterFrame />
      <Pillar x={3.5} y={5} w={3} h={1.6} />
      <Pillar x={3.5} y={7.5} w={5} h={1.6} />
      <Pillar x={3.5} y={10} w={4} h={1.6} tone="soft" />
    </Track>
  )
}

export function visibilityGlyphId(value: string): VisibilityGlyphId {
  if (value === 'hidden') return 'hidden'
  if (value === 'collapse') return 'collapse'
  return 'visible'
}

export function boxSizingGlyphId(value: string): BoxSizingGlyphId {
  return value === 'border-box' ? 'border-box' : 'content-box'
}

export function whiteSpaceGlyphId(value: string): WhiteSpaceGlyphId {
  if (value === 'nowrap') return 'nowrap'
  if (value === 'pre') return 'pre'
  if (value === 'pre-wrap' || value === 'pre-line' || value === 'break-spaces') return 'pre-wrap'
  return 'normal'
}

export function floatGlyphId(value: string): FloatGlyphId {
  if (value === 'left') return 'left'
  if (value === 'right') return 'right'
  return 'none'
}

export function writingModeGlyphId(value: string): WritingModeGlyphId {
  if (value.includes('vertical') || value === 'tb' || value === 'tb-rl') return 'vertical'
  return 'horizontal'
}
