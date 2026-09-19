# MSQDX UI — SeriesChart

**Status:** Accepted — 2026-09-19  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/SeriesChart.tsx`  
**Consumers:** CHECKION GEO position history; METRON trends later

## Purpose
Domain-free **multi-series line chart** over shared categorical / time labels. Complements single-series [`Chart`](./msqdx-ui-chart.md) — do not fold multi-series into Chart.

## API

```ts
type SeriesChartPoint = {
  label: string
  /** Omit or null = gap (no vertex / break the path) */
  value: number | null
}

type SeriesChartSeries = {
  id: string
  label: string
  points: SeriesChartPoint[]
}

type SeriesChartProps = {
  series: SeriesChartSeries[]
  title?: string
  height?: number
  /** When true, higher values plot lower (rank / position charts). Default false. */
  invertY?: boolean
  valueFormatter?: (n: number) => string
  className?: string
}
```

## Behaviour
- Shared X labels = union of series point labels in first-seen order (or labels from the densest series).
- Null values = path break (gap), not zero.
- Legend lists series with token-based stroke colors (`--chart-*` / accent mix).
- No Recharts / visx dependency.

## Accessibility
- Root `role="img"` + `aria-label` from title or summary.
- Legend text is readable; values available via `<title>` on marks.

## Acceptance
1. Stories: default multi-series · inverted Y · gaps · empty.
2. Unit tests cover invertY geometry and gap handling.
3. Apps import `SeriesChart` from `@msqdx/ui`.
