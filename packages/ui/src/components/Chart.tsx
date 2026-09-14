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
  /** Category ticks under the plot (default true). */
  showTicks?: boolean
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'title'>

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function defaultFormat(n: number): string {
  return Number.isFinite(n) ? String(n) : '—'
}

function truncateLabel(label: string, max = 12): string {
  const t = label.trim()
  if (t.length <= max) return t
  return `${t.slice(0, Math.max(1, max - 1))}…`
}

/** Domain-free bar/line chart — specs/domain/msqdx-ui-chart.md */
export function Chart({
  variant = 'bar',
  data,
  title,
  height = 200,
  valueFormatter = defaultFormat,
  onPointClick,
  showTicks = true,
  className,
  ...rest
}: ChartProps) {
  const safe = Array.isArray(data) ? data.filter((d) => d && typeof d.value === 'number') : []
  const max = Math.max(1, ...safe.map((d) => d.value))
  const padX = 10
  const padTop = 16
  const tickBand = showTicks ? 36 : 10
  const plotW = 360
  const plotH = Math.max(100, height)
  const innerW = plotW - padX * 2
  const innerH = Math.max(48, plotH - padTop - tickBand)
  const n = Math.max(1, safe.length)
  const slot = innerW / n
  const interactive = typeof onPointClick === 'function'
  const tickMax = Math.max(4, Math.min(14, Math.floor(slot / 5.5)))
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
          y1={padTop + innerH}
          y2={padTop + innerH}
        />
        {variant === 'bar'
          ? safe.map((point, i) => {
              const h = (point.value / max) * innerH
              const w = Math.max(6, slot * 0.62)
              const x = padX + i * slot + (slot - w) / 2
              const y = padTop + innerH - h
              const cx = x + w / 2
              return (
                <g
                  key={`${point.label}-${i}`}
                  className="ds-chart__point"
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
                  <rect
                    className="ds-chart__bar"
                    x={x}
                    y={y}
                    width={w}
                    height={Math.max(2, h)}
                    rx={2}
                  >
                    <title>{`${point.label}: ${valueFormatter(point.value)}`}</title>
                  </rect>
                  {point.value > 0 ? (
                    <text
                      className="ds-chart__value-label"
                      x={cx}
                      y={Math.max(10, y - 4)}
                      textAnchor="middle"
                    >
                      {valueFormatter(point.value)}
                    </text>
                  ) : null}
                  {showTicks ? (
                    <text
                      className="ds-chart__tick"
                      x={cx}
                      y={padTop + innerH + 14}
                      textAnchor="middle"
                    >
                      {truncateLabel(point.label, tickMax)}
                    </text>
                  ) : null}
                </g>
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
                const y = padTop + innerH - (point.value / max) * innerH
                return `${x},${y}`
              })
              .join(' ')}
          />
        ) : null}
        {variant === 'line'
          ? safe.map((point, i) => {
              const x = padX + i * slot + slot / 2
              const y = padTop + innerH - (point.value / max) * innerH
              return (
                <g
                  key={`${point.label}-${i}`}
                  className="ds-chart__point"
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
                  <circle className="ds-chart__dot" cx={x} cy={y} r={interactive ? 5 : 3}>
                    <title>{`${point.label}: ${valueFormatter(point.value)}`}</title>
                  </circle>
                  {showTicks ? (
                    <text
                      className="ds-chart__tick"
                      x={x}
                      y={padTop + innerH + 14}
                      textAnchor="middle"
                    >
                      {truncateLabel(point.label, tickMax)}
                    </text>
                  ) : null}
                </g>
              )
            })
          : null}
      </svg>
      <table className="ds-chart__table">
        <caption className="ds-chart__caption">{summary}</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
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
