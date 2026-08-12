/**
 * HTML visual twins of plexon `pdf/magazine/*` — Storybook Print/ layer.
 * Keep CSS (`css/print.css`) and tokens aligned with plexon Magazin-PDF.
 */

import type { CSSProperties, ReactNode } from 'react'
import { printMagColors } from './tokens'

export function PrintPage({
  children,
  folioTitle = 'beispiel.de',
  folioPage = '1 — 8',
}: {
  children: ReactNode
  folioTitle?: string
  folioPage?: string
}) {
  return (
    <div className="msqdx-print-page">
      {children}
      <footer className="msqdx-print-folio">
        <span>{folioTitle}</span>
        <span>{folioPage}</span>
      </footer>
    </div>
  )
}

export function PrintChapter({
  eyebrow,
  title,
  lede,
  index,
  children,
}: {
  eyebrow: string
  title: string
  lede?: string
  index?: string
  children?: ReactNode
}) {
  return (
    <section className="msqdx-print-chapter">
      {index ? <p className="msqdx-print-chapter-index">{index}</p> : null}
      <p className="msqdx-print-eyebrow">{eyebrow}</p>
      <h3 className="msqdx-print-headline">{title}</h3>
      <div className="msqdx-print-accent-rule" aria-hidden />
      {lede ? <p className="msqdx-print-lede">{lede}</p> : null}
      {children}
    </section>
  )
}

export function PrintPullQuote({ label, body }: { label?: string; body: string }) {
  return (
    <aside className="msqdx-print-pull">
      <div className="msqdx-print-pull__bar" aria-hidden />
      <div>
        {label ? <p className="msqdx-print-sub-eyebrow">{label}</p> : null}
        <p className="msqdx-print-body" style={{ marginBottom: 0 }}>
          {body}
        </p>
      </div>
    </aside>
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
      <div className="msqdx-print-cover-meta">
        {url ? <p className="msqdx-print-meta">{url}</p> : null}
        {meta ? <p className="msqdx-print-meta">{meta}</p> : null}
      </div>
      {fazit ? <PrintPullQuote label="Fazit" body={fazit} /> : null}
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
              <span>{pct}%</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function PrintTwoColumn({
  left,
  right,
}: {
  left: ReactNode
  right: ReactNode
}) {
  return (
    <div className="msqdx-print-two-col">
      <div className="msqdx-print-two-col__cell">{left}</div>
      <div className="msqdx-print-two-col__cell">{right}</div>
    </div>
  )
}

export function PrintRankedList({
  items,
  columns = 1,
  compact = false,
  startIndex = 1,
}: {
  items: Array<{ label: string; meta?: string }>
  columns?: 1 | 2
  compact?: boolean
  startIndex?: number
}) {
  const mid = columns === 2 && items.length > 1 ? Math.ceil(items.length / 2) : items.length
  const left = items.slice(0, mid)
  const right = items.slice(mid)

  const renderCol = (colItems: typeof items, offset: number) => (
    <ol className={`msqdx-print-ranked${compact ? ' msqdx-print-ranked--compact' : ''}`}>
      {colItems.map((item, i) => (
        <li key={`${item.label}-${i}`} className="msqdx-print-ranked__row">
          <span className="msqdx-print-ranked__i">
            {String(offset + i).padStart(2, '0')}
          </span>
          <div className="msqdx-print-ranked__text">
            <p className="msqdx-print-ranked__label">{item.label}</p>
            {item.meta ? <p className="msqdx-print-meta">{item.meta}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )

  if (columns === 2 && right.length) {
    return (
      <div className="msqdx-print-two-col">
        <div className="msqdx-print-two-col__cell">{renderCol(left, startIndex)}</div>
        <div className="msqdx-print-two-col__cell">
          {renderCol(right, startIndex + left.length)}
        </div>
      </div>
    )
  }

  return renderCol(items, startIndex)
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
            <div className="msqdx-print-ranked__text">
              <p className="msqdx-print-ranked__label">{item.label}</p>
              {item.detail ? <p className="msqdx-print-meta">{item.detail}</p> : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export function PrintChip({ children }: { children: ReactNode }) {
  return <span className="msqdx-print-chip">{children}</span>
}

export function PrintChipRow({ children }: { children: ReactNode }) {
  return <div className="msqdx-print-chip-row">{children}</div>
}

export function PrintTraitBars({
  traits,
}: {
  traits: Array<{ displayName: string; score: number }>
}) {
  if (!traits.length) return null
  return (
    <div className="msqdx-print-traits">
      {traits.map((t) => {
        const pct = Math.round(t.score <= 1 ? t.score * 100 : t.score)
        return (
          <div key={t.displayName} className="msqdx-print-traits__row">
            <div className="msqdx-print-traits__meta">
              <span>{t.displayName}</span>
              <span>{pct}%</span>
            </div>
            <div className="msqdx-print-traits__track">
              <div className="msqdx-print-traits__fill" style={{ width: `${Math.max(2, Math.min(100, pct))}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export type PrintPersona = {
  name: string
  segment?: string
  confidence?: number
  bio?: string
  traits?: Array<{ displayName: string; score: number }>
  goals?: string[]
  painPoints?: string[]
}

export function PrintPersonaCard({
  persona,
  spread = false,
}: {
  persona: PrintPersona
  spread?: boolean
}) {
  const confidence =
    persona.confidence == null
      ? null
      : Math.round(persona.confidence <= 1 ? persona.confidence * 100 : persona.confidence)

  return (
    <article className={spread ? 'msqdx-print-persona msqdx-print-persona--spread' : 'msqdx-print-persona'}>
      <h4 className="msqdx-print-persona__name">{persona.name}</h4>
      <PrintChipRow>
        {persona.segment ? <PrintChip>{persona.segment}</PrintChip> : null}
        {confidence != null ? <PrintChip>{confidence}% Konfidenz</PrintChip> : null}
      </PrintChipRow>
      {persona.bio ? <p className="msqdx-print-persona__bio">{persona.bio}</p> : null}
      {persona.traits?.length ? <PrintTraitBars traits={persona.traits} /> : null}
      {spread && (persona.goals?.length || persona.painPoints?.length) ? (
        <div style={{ marginTop: '0.85rem' }}>
          <PrintTwoColumn
            left={
              persona.goals?.length ? (
                <div>
                  <p className="msqdx-print-sub-eyebrow">Ziele</p>
                  <PrintRankedList
                    compact
                    items={persona.goals.map((g) => ({ label: g }))}
                  />
                </div>
              ) : (
                <div />
              )
            }
            right={
              persona.painPoints?.length ? (
                <div>
                  <p className="msqdx-print-sub-eyebrow">Pain Points</p>
                  <PrintRankedList
                    compact
                    items={persona.painPoints.map((g) => ({ label: g }))}
                  />
                </div>
              ) : (
                <div />
              )
            }
          />
        </div>
      ) : null}
      {!spread && persona.goals?.length ? (
        <div style={{ marginTop: '0.65rem' }}>
          <p className="msqdx-print-sub-eyebrow">Ziele</p>
          <PrintRankedList compact items={persona.goals.slice(0, 3).map((g) => ({ label: g }))} />
        </div>
      ) : null}
    </article>
  )
}

export function PrintPersonaGrid({ personas }: { personas: PrintPersona[] }) {
  if (personas.length === 1) {
    return <PrintPersonaCard persona={personas[0]!} spread />
  }
  const rows: PrintPersona[][] = []
  for (let i = 0; i < personas.length; i += 2) {
    rows.push(personas.slice(i, i + 2))
  }
  return (
    <div className="msqdx-print-persona-grid">
      {rows.map((pair, ri) => (
        <div key={ri} className="msqdx-print-two-col" style={ri > 0 ? { marginTop: '1.35rem' } : undefined}>
          {pair.map((p) => (
            <div key={p.name} className="msqdx-print-two-col__cell">
              <PrintPersonaCard persona={p} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function PrintTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: Array<Array<string | number | null>>
}) {
  return (
    <table className="msqdx-print-table">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {columns.map((_, ci) => (
              <td key={ci}>{row[ci] == null || row[ci] === '' ? '–' : String(row[ci])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
