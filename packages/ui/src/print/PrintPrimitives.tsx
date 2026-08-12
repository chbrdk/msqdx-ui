import type { CSSProperties, ReactNode } from 'react'
import { printMagColors } from './tokens'

export function PrintPage({ children }: { children: ReactNode }) {
  return <div className="msqdx-print-page">{children}</div>
}

export function PrintChapter({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: string
  lede?: string
  children?: ReactNode
}) {
  return (
    <section className="msqdx-print-chapter">
      <p className="msqdx-print-eyebrow">{eyebrow}</p>
      <h3 className="msqdx-print-headline">{title}</h3>
      <div className="msqdx-print-accent-rule" aria-hidden />
      {lede ? <p className="msqdx-print-lede">{lede}</p> : null}
      {children}
    </section>
  )
}

export function PrintCover({
  eyebrow,
  title,
  url,
  meta,
  fazit,
  kpis,
}: {
  eyebrow: string
  title: string
  url?: string
  meta?: string
  fazit?: string
  kpis?: Array<{ label: string; value: string; ringPct?: number }>
}) {
  return (
    <header>
      <p className="msqdx-print-eyebrow">{eyebrow}</p>
      <h2 className="msqdx-print-cover-headline">{title}</h2>
      <div className="msqdx-print-accent-rule" aria-hidden />
      {url ? <p className="msqdx-print-meta">{url}</p> : null}
      {meta ? <p className="msqdx-print-meta">{meta}</p> : null}
      {fazit ? (
        <div className="msqdx-print-wash">
          <p className="msqdx-print-eyebrow">Fazit</p>
          <p className="msqdx-print-body">{fazit}</p>
        </div>
      ) : null}
      {kpis?.length ? (
        <div className="msqdx-print-kpi-row">
          {kpis.map((kpi) =>
            kpi.ringPct != null ? (
              <div key={kpi.label} className="msqdx-print-kpi">
                <PrintScoreRing value={kpi.ringPct} label={kpi.label} />
              </div>
            ) : (
              <div key={kpi.label} className="msqdx-print-kpi">
                <div className="msqdx-print-kpi__value">{kpi.value}</div>
                <div className="msqdx-print-kpi__label">{kpi.label}</div>
              </div>
            ),
          )}
        </div>
      ) : null}
    </header>
  )
}

export function PrintScoreRing({
  value,
  max = 100,
  label,
}: {
  value: number
  max?: number
  label?: string
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div>
      <div
        className="msqdx-print-ring"
        style={{ ['--print-ring-pct' as string]: pct } as CSSProperties}
        role="img"
        aria-label={`${Math.round(value)} von ${max}`}
      >
        <div className="msqdx-print-ring__chart" aria-hidden />
        <div className="msqdx-print-ring__value">{Math.round(value)}</div>
      </div>
      {label ? <div className="msqdx-print-kpi__label">{label}</div> : null}
    </div>
  )
}

export type PrintDonutSlice = { id: string; label: string; value: number }

export function PrintDonut({
  slices,
  centerValue,
  centerLabel,
}: {
  slices: PrintDonutSlice[]
  centerValue?: string | number
  centerLabel?: string
}) {
  const positive = slices.filter((s) => s.value > 0)
  const total = positive.reduce((sum, s) => sum + s.value, 0) || 1
  let acc = 0
  const stops: string[] = []
  positive.forEach((slice, i) => {
    const start = (acc / total) * 100
    acc += slice.value
    const end = (acc / total) * 100
    const color = printMagColors.donut[Math.min(i, printMagColors.donut.length - 1)]
    stops.push(`${color} ${start}% ${end}%`)
  })
  return (
    <div className="msqdx-print-donut">
      <div
        className="msqdx-print-donut__chart"
        style={{
          background: `conic-gradient(from -90deg, ${stops.join(', ') || 'var(--print-line) 0 100%'})`,
        }}
        role="img"
        aria-label={centerLabel ?? 'Verteilung'}
      >
        <div className="msqdx-print-donut__hole">
          {centerValue != null ? (
            <span className="msqdx-print-donut__center-v">{centerValue}</span>
          ) : null}
          {centerLabel ? <span className="msqdx-print-donut__center-k">{centerLabel}</span> : null}
        </div>
      </div>
      <ul className="msqdx-print-donut__legend">
        {positive.map((slice, i) => {
          const pct = Math.round((100 * slice.value) / total)
          const color = printMagColors.donut[Math.min(i, printMagColors.donut.length - 1)]
          return (
            <li key={slice.id}>
              <span
                className="msqdx-print-donut__swatch"
                style={{ ['--print-swatch' as string]: color } as CSSProperties}
              />
              <span>{slice.label}</span>
              <span>{slice.value.toLocaleString('de-DE')}</span>
              <span>{pct}%</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function PrintRankedList({
  items,
}: {
  items: Array<{ label: string; meta?: string }>
}) {
  return (
    <ol className="msqdx-print-ranked">
      {items.map((item, i) => (
        <li key={`${item.label}-${i}`} className="msqdx-print-ranked__row">
          <span className="msqdx-print-ranked__i">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <p className="msqdx-print-ranked__label">{item.label}</p>
            {item.meta ? <p className="msqdx-print-meta">{item.meta}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function PrintLedger({
  items,
  max = 100,
}: {
  items: Array<{ label: string; score: number; detail?: string }>
  max?: number
}) {
  const sorted = [...items].sort((a, b) => a.score - b.score)
  return (
    <ol className="msqdx-print-ledger">
      {sorted.map((item, i) => {
        const tone =
          item.score < max * 0.4
            ? printMagColors.neg
            : item.score < max * 0.7
              ? printMagColors.warn
              : printMagColors.accentInk
        return (
          <li key={`${item.label}-${i}`} className="msqdx-print-ledger__row">
            <span className="msqdx-print-ranked__i">{String(i + 1).padStart(2, '0')}</span>
            <span className="msqdx-print-ledger__score" style={{ color: tone }}>
              {Math.round(item.score)}
            </span>
            <div>
              <p className="msqdx-print-ranked__label">{item.label}</p>
              {item.detail ? <p className="msqdx-print-meta">{item.detail}</p> : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
