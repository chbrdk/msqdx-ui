'use client'

import type { HTMLAttributes } from 'react'

export type ChartPoint = {
  label: string
  value: number
}

export type ChartProps = {
  variant?: 'bar' | 'line'
  data: ChartPoint[]
  title?: string
  height?: number
  valueFormatter?: (n: number) => string
  /** Optional point activation (cross-filter / drill). */
  onPointClick?: (point: ChartPoint, index: number) => void
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'title'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function defaultFormat(n: number): string {
  return Number.isFinite(n) ? String(n) : '—'
}

/** Domain-free bar/line chart — specs/domain/msqdx-ui-chart.md */
export function Chart({
  variant = 'bar',
  data,
  title,
  height = 180,
  valueFormatter = defaultFormat,
  onPointClick,
  className,
  ...rest
}: ChartProps) {
  const safe = Array.isArray(data) ? data.filter((d) => d && typeof d.value === 'number') : []
  const max = Math.max(1, ...safe.map((d) => d.value))
  const padX = 8
  const padY = 12
  const plotW = 320
  const plotH = Math.max(80, height - 24)
  const innerW = plotW - padX * 2
  const innerH = plotH - padY * 2
  const n = Math.max(1, safe.length)
  const slot = innerW / n
  const interactive = typeof onPointClick === 'function'
  const summary =
    title ||
    (safe.length
      ? `Chart with ${safe.length} values from ${valueFormatter(safe[0].value)} to ${valueFormatter(safe[safe.length - 1].value)}`
      : 'Empty chart')

  return (
    <div
      className={cx('ds-chart', `ds-chart--${variant}`, interactive && 'ds-chart--interactive', className)}
      {...rest}
    >
      {title ? <div className="ds-chart__title">{title}</div> : null}
      <svg
        className="ds-chart__svg"
        viewBox={`0 0 ${plotW} ${plotH}`}
        role="img"
        aria-label={summary}
        height={height}
      >
        <line
          className="ds-chart__grid"
          x1={padX}
          x2={plotW - padX}
          y1={plotH - padY}
          y2={plotH - padY}
        />
        {variant === 'bar'
          ? safe.map((point, i) => {
              const h = (point.value / max) * innerH
              const w = Math.max(4, slot * 0.62)
              const x = padX + i * slot + (slot - w) / 2
              const y = padY + innerH - h
              return (
                <rect
                  key={`${point.label}-${i}`}
                  className="ds-chart__bar"
                  x={x}
                  y={y}
                  width={w}
                  height={Math.max(1, h)}
                  rx={2}
                  role={interactive ? 'button' : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  style={interactive ? { cursor: 'pointer' } : undefined}
                  onClick={
                    interactive
                      ? (e) => {
                          e.stopPropagation()
                          onPointClick?.(point, i)
                        }
                      : undefined
                  }
                  onKeyDown={
                    interactive
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onPointClick?.(point, i)
                          }
                        }
                      : undefined
                  }
                >
                  <title>{`${point.label}: ${valueFormatter(point.value)}`}</title>
                </rect>
              )
            })
          : null}
        {variant === 'line' && safe.length > 0 ? (
          <polyline
            className="ds-chart__line"
            fill="none"
            points={safe
              .map((point, i) => {
                const x = padX + i * slot + slot / 2
                const y = padY + innerH - (point.value / max) * innerH
                return `${x},${y}`
              })
              .join(' ')}
          />
        ) : null}
        {variant === 'line'
          ? safe.map((point, i) => {
              const x = padX + i * slot + slot / 2
              const y = padY + innerH - (point.value / max) * innerH
              return (
                <circle
                  key={`${point.label}-${i}`}
                  className="ds-chart__dot"
                  cx={x}
                  cy={y}
                  r={interactive ? 5 : 3}
                  role={interactive ? 'button' : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  style={interactive ? { cursor: 'pointer' } : undefined}
                  onClick={
                    interactive
                      ? (e) => {
                          e.stopPropagation()
                          onPointClick?.(point, i)
                        }
                      : undefined
                  }
                  onKeyDown={
                    interactive
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onPointClick?.(point, i)
                          }
                        }
                      : undefined
                  }
                >
                  <title>{`${point.label}: ${valueFormatter(point.value)}`}</title>
                </circle>
              )
            })
          : null}
      </svg>
      <table className="ds-chart__table">
        <caption>{summary}</caption>
        <tbody>
          {safe.map((point, i) => (
            <tr
              key={`${point.label}-${i}`}
              className={interactive ? 'ds-chart__row--interactive' : undefined}
              onClick={
                interactive
                  ? (e) => {
                      e.stopPropagation()
                      onPointClick?.(point, i)
                    }
                  : undefined
              }
            >
              <th scope="row">{point.label}</th>
              <td>{valueFormatter(point.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
