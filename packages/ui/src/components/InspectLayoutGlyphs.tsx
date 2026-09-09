/**
 * Theme-aware inspect layout glyphs (size modes, media fit, grid columns/span).
 * Spec: specs/domain/msqdx-ui-inspect-layout-glyphs.md
 * Colors via CSS tokens only (--ink / --line / --accent / --muted).
 */

import type { ReactNode } from 'react'
import { useId } from 'react'

export type SizeModeGlyphId = 'hug' | 'fill' | 'fixed'
export type MediaFitGlyphId =
  | 'cover'
  | 'contain'
  | 'auto'
  | 'fill'
  | 'none'
  | 'scale-down'

export type GridColumnGlyphId =
  | 'cols-1'
  | 'cols-2'
  | 'cols-3'
  | 'cols-4'
  | 'cols-6'
  | 'cols-12'
  | 'auto-fit'
  | 'auto-fill'
  | 'split-1-2'
  | 'split-2-1'
  | 'sidebar'
  | 'three-pane'

export type GridSpanGlyphId =
  | 'span-auto'
  | 'span-1'
  | 'span-2'
  | 'span-3'
  | 'span-4'
  | 'span-6'
  | 'span-12'
  | 'span-full'

const VIEW = 20

function Track({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <svg
      className={className ?? 'ds-inspect-glyph'}
      width={VIEW}
      height={VIEW}
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="0.5"
        y="0.5"
        width={VIEW - 1}
        height={VIEW - 1}
        rx="2"
        className="ds-inspect-glyph__frame"
      />
      {children}
    </svg>
  )
}

function SoftFrame({
  x,
  y,
  w,
  h,
}: {
  x: number
  y: number
  w: number
  h: number
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="1"
      className="ds-inspect-glyph__cell ds-inspect-glyph__cell--empty"
    />
  )
}

function ColBars({ widths, gap = 1 }: { widths: number[]; gap?: number }) {
  const pad = 2
  const inner = VIEW - pad * 2
  const totalGap = gap * Math.max(0, widths.length - 1)
  const unit = (inner - totalGap) / widths.reduce((a, b) => a + b, 0)
  let x = pad
  return (
    <>
      {widths.map((w, i) => {
        const width = Math.max(1.2, w * unit)
        const el = (
          <rect
            key={i}
            x={x}
            y={pad}
            width={width}
            height={inner}
            rx="1"
            className="ds-inspect-glyph__cell ds-inspect-glyph__cell--strong"
          />
        )
        x += width + gap
        return el
      })}
    </>
  )
}

function equalCols(n: number): number[] {
  if (n <= 4) return Array.from({ length: n }, () => 1)
  if (n === 6) return [1, 1, 1, 1, 1, 1]
  return [1, 1, 1, 1, 1, 1]
}

export function SizeModeGlyph({
  id,
  axis = 'both',
}: {
  id: SizeModeGlyphId
  axis?: 'width' | 'height' | 'both'
}) {
  switch (id) {
    case 'hug':
      return (
        <Track className="ds-inspect-glyph ds-inspect-glyph--size">
          <SoftFrame x={3} y={3} w={14} h={14} />
          <rect
            x={axis === 'height' ? 5 : 6}
            y={axis === 'width' ? 5 : 7}
            width={axis === 'height' ? 10 : 8}
            height={axis === 'width' ? 10 : 6}
            rx="1"
            className="ds-inspect-glyph__cell ds-inspect-glyph__cell--strong"
          />
        </Track>
      )
    case 'fill':
      return (
        <Track className="ds-inspect-glyph ds-inspect-glyph--size">
          <rect
            x={3}
            y={3}
            width={14}
            height={14}
            rx="1"
            className="ds-inspect-glyph__cell ds-inspect-glyph__cell--strong"
          />
          {axis !== 'height' ? (
            <>
              <line x1="5" y1="10" x2="15" y2="10" className="ds-inspect-glyph__accent" />
              <polyline points="7,8 5,10 7,12" className="ds-inspect-glyph__accent" fill="none" />
              <polyline points="13,8 15,10 13,12" className="ds-inspect-glyph__accent" fill="none" />
            </>
          ) : (
            <>
              <line x1="10" y1="5" x2="10" y2="15" className="ds-inspect-glyph__accent" />
              <polyline points="8,7 10,5 12,7" className="ds-inspect-glyph__accent" fill="none" />
              <polyline points="8,13 10,15 12,13" className="ds-inspect-glyph__accent" fill="none" />
            </>
          )}
        </Track>
      )
    case 'fixed':
      return (
        <Track className="ds-inspect-glyph ds-inspect-glyph--size">
          <rect
            x={5}
            y={5}
            width={10}
            height={10}
            rx="1"
            className="ds-inspect-glyph__cell ds-inspect-glyph__cell--strong"
          />
          {axis !== 'height' ? (
            <>
              <line x1="5" y1="17" x2="15" y2="17" className="ds-inspect-glyph__accent" />
              <line x1="5" y1="16" x2="5" y2="18" className="ds-inspect-glyph__accent" />
              <line x1="15" y1="16" x2="15" y2="18" className="ds-inspect-glyph__accent" />
            </>
          ) : (
            <>
              <line x1="17" y1="5" x2="17" y2="15" className="ds-inspect-glyph__accent" />
              <line x1="16" y1="5" x2="18" y2="5" className="ds-inspect-glyph__accent" />
              <line x1="16" y1="15" x2="18" y2="15" className="ds-inspect-glyph__accent" />
            </>
          )}
        </Track>
      )
    default:
      return (
        <Track className="ds-inspect-glyph ds-inspect-glyph--size">
          <SoftFrame x={4} y={4} w={12} h={12} />
        </Track>
      )
  }
}

export function MediaFitGlyph({ id }: { id: MediaFitGlyphId }) {
  const clipId = useId().replace(/:/g, '')

  if (id === 'cover') {
    return (
      <Track>
        <defs>
          <clipPath id={clipId}>
            <rect x="3" y="4" width="14" height="12" rx="1" />
          </clipPath>
        </defs>
        <rect
          x="3"
          y="4"
          width="14"
          height="12"
          rx="1"
          className="ds-inspect-glyph__cell ds-inspect-glyph__cell--empty"
        />
        <g clipPath={`url(#${clipId})`}>
          <rect
            x="0.5"
            y="2"
            width="19"
            height="16"
            rx="1"
            className="ds-inspect-glyph__cell ds-inspect-glyph__cell--strong"
          />
        </g>
      </Track>
    )
  }

  switch (id) {
    case 'contain':
      return (
        <Track>
          <SoftFrame x={3} y={3} w={14} h={14} />
          <rect
            x={5}
            y={6}
            width={10}
            height={8}
            rx="1"
            className="ds-inspect-glyph__cell ds-inspect-glyph__cell--strong"
          />
        </Track>
      )
    case 'auto':
    case 'none':
      return (
        <Track>
          <SoftFrame x={3} y={3} w={14} h={14} />
          <rect
            x={4}
            y={5}
            width={9}
            height={7}
            rx="1"
            className="ds-inspect-glyph__cell ds-inspect-glyph__cell--strong"
          />
        </Track>
      )
    case 'fill':
      return (
        <Track>
          <rect
            x={3}
            y={3}
            width={14}
            height={14}
            rx="1"
            className="ds-inspect-glyph__cell ds-inspect-glyph__cell--strong"
          />
          <line x1="5" y1="7" x2="15" y2="13" className="ds-inspect-glyph__dash" />
        </Track>
      )
    case 'scale-down':
      return (
        <Track>
          <SoftFrame x={3} y={3} w={14} h={14} />
          <rect
            x={6}
            y={7}
            width={8}
            height={6}
            rx="1"
            className="ds-inspect-glyph__cell ds-inspect-glyph__cell--soft"
          />
        </Track>
      )
    default:
      return (
        <Track>
          <SoftFrame x={4} y={4} w={12} h={12} />
        </Track>
      )
  }
}

export function GridColumnGlyph({ id }: { id: GridColumnGlyphId }) {
  switch (id) {
    case 'cols-1':
      return (
        <Track>
          <ColBars widths={[1]} />
        </Track>
      )
    case 'cols-2':
      return (
        <Track>
          <ColBars widths={equalCols(2)} />
        </Track>
      )
    case 'cols-3':
      return (
        <Track>
          <ColBars widths={equalCols(3)} />
        </Track>
      )
    case 'cols-4':
      return (
        <Track>
          <ColBars widths={equalCols(4)} />
        </Track>
      )
    case 'cols-6':
      return (
        <Track>
          <ColBars widths={equalCols(6)} gap={0.6} />
        </Track>
      )
    case 'cols-12':
      return (
        <Track>
          <ColBars widths={equalCols(12)} gap={0.45} />
        </Track>
      )
    case 'auto-fit':
      return (
        <Track>
          <ColBars widths={[1, 1, 1]} />
          <line
            x1="2"
            y1="17.5"
            x2="18"
            y2="17.5"
            className="ds-inspect-glyph__dash"
            strokeDasharray="1.5 1.5"
          />
        </Track>
      )
    case 'auto-fill':
      return (
        <Track>
          <ColBars widths={[1, 1, 1, 1]} gap={0.7} />
          <line
            x1="2"
            y1="17.5"
            x2="18"
            y2="17.5"
            className="ds-inspect-glyph__dash"
            strokeDasharray="1.5 1.5"
          />
        </Track>
      )
    case 'split-1-2':
      return (
        <Track>
          <ColBars widths={[1, 2]} />
        </Track>
      )
    case 'split-2-1':
      return (
        <Track>
          <ColBars widths={[2, 1]} />
        </Track>
      )
    case 'sidebar':
      return (
        <Track>
          <ColBars widths={[1, 3]} />
        </Track>
      )
    case 'three-pane':
      return (
        <Track>
          <ColBars widths={[1, 2, 1]} />
        </Track>
      )
    default:
      return (
        <Track>
          <ColBars widths={[1, 1]} />
        </Track>
      )
  }
}

export function GridSpanGlyph({
  id,
  axis,
}: {
  id: GridSpanGlyphId
  axis: 'col' | 'row'
}) {
  const pad = 2
  const inner = VIEW - pad * 2
  const slots = 4
  const gap = 1
  const slot = (inner - gap * (slots - 1)) / slots

  let fillCount = 0
  let mutedAll = false
  let full = false
  switch (id) {
    case 'span-auto':
      mutedAll = true
      fillCount = 1
      break
    case 'span-1':
      fillCount = 1
      break
    case 'span-2':
      fillCount = 2
      break
    case 'span-3':
      fillCount = 3
      break
    case 'span-4':
      fillCount = 4
      break
    case 'span-6':
    case 'span-12':
    case 'span-full':
      full = true
      fillCount = 4
      break
  }

  return (
    <Track>
      {Array.from({ length: slots }, (_, i) => {
        const active = full || i < fillCount
        const className =
          mutedAll && active
            ? 'ds-inspect-glyph__cell ds-inspect-glyph__cell--soft'
            : active
              ? 'ds-inspect-glyph__cell ds-inspect-glyph__cell--strong'
              : 'ds-inspect-glyph__cell ds-inspect-glyph__cell--empty'
        if (axis === 'col') {
          return (
            <rect
              key={i}
              x={pad + i * (slot + gap)}
              y={pad}
              width={slot}
              height={inner}
              rx="1"
              className={className}
            />
          )
        }
        return (
          <rect
            key={i}
            x={pad}
            y={pad + i * (slot + gap)}
            width={inner}
            height={slot}
            rx="1"
            className={className}
          />
        )
      })}
    </Track>
  )
}

export function sizeModeGlyphId(mode: string): SizeModeGlyphId {
  if (mode === 'fill') return 'fill'
  if (mode === 'fixed') return 'fixed'
  return 'hug'
}

export function mediaFitGlyphId(value: string): MediaFitGlyphId {
  switch (value) {
    case 'cover':
      return 'cover'
    case 'contain':
      return 'contain'
    case 'auto':
      return 'auto'
    case 'fill':
      return 'fill'
    case 'none':
      return 'none'
    case 'scale-down':
      return 'scale-down'
    default:
      return 'cover'
  }
}

export function mediaFitLabel(value: string): string {
  switch (value) {
    case 'cover':
      return 'Cover'
    case 'contain':
      return 'Contain'
    case 'auto':
      return 'Auto'
    case 'fill':
      return 'Fill'
    case 'none':
      return 'None'
    case 'scale-down':
      return 'Scale'
    default:
      return value
  }
}

export function columnGlyphForPresetLabel(label: string): GridColumnGlyphId {
  switch (label) {
    case '1 Col':
      return 'cols-1'
    case '2 Col':
      return 'cols-2'
    case '3 Col':
      return 'cols-3'
    case '4 Col':
      return 'cols-4'
    case '6 Col':
      return 'cols-6'
    case '12 Col':
      return 'cols-12'
    case 'Auto-Fit':
      return 'auto-fit'
    case 'Auto-Fill':
      return 'auto-fill'
    case '1 : 2':
      return 'split-1-2'
    case '2 : 1':
      return 'split-2-1'
    case 'Sidebar':
      return 'sidebar'
    case '3-Pane':
      return 'three-pane'
    default:
      return 'cols-2'
  }
}

export function spanGlyphForPresetLabel(label: string): GridSpanGlyphId {
  switch (label) {
    case 'Auto':
      return 'span-auto'
    case '1':
      return 'span-1'
    case '2':
      return 'span-2'
    case '3':
      return 'span-3'
    case '4':
      return 'span-4'
    case '6':
      return 'span-6'
    case '12':
      return 'span-12'
    case 'Full':
      return 'span-full'
    default:
      return 'span-1'
  }
}
