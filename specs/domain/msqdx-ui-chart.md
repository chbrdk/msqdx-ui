# MSQDX UI — Chart

**Status:** Accepted — 2026-09-14 (labels + legend)  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/Chart.tsx`  
**Consumers:** METRON Wave 6 dashboards (and future suite analytics)

## Purpose

Domain-free **bar / line chart** for Collection dashboards. Uses design-system chart tokens (`--chart-*` / `forestChart` palette) — no Recharts/visx dependency in Phase 1.

## API

```ts
type ChartPoint = { label: string; value: number }

type ChartProps = {
  variant?: 'bar' | 'line'
  data: ChartPoint[]
  title?: string
  height?: number // default 200 (plot + tick band)
  valueFormatter?: (n: number) => string
  /** Optional point activation (cross-filter / drill). */
  onPointClick?: (point: ChartPoint, index: number) => void
  /** Show category ticks under the plot (default true). */
  showTicks?: boolean
  className?: string
}
```

## Presentation

- SVG bars/line with **compact** category ticks and value labels (`fontSize` in SVG user units — not CSS px — so labels stay proportional)
- `formatChartValue` trims floats (`52.936…` → `52.94`)
- Visible **legend table** (label + value); interactive when `onPointClick` is set
- Tooltips via SVG `<title>` on marks

## Accessibility

- Root `role="img"` with `aria-label` from `title` or generated summary
- Legend table remains the readable/clickable label surface for AT and sighted users

## Non-goals

- Multi-series stacking / dual axes (Wave 6.1+)
- Streaming updates
- Product KPI evaluation (belongs in METRON)

## Acceptance

1. Stories: Bar, Line, Empty  
2. Unit tests render bars/polyline + visible legend labels + `onPointClick`  
3. Exported from `@msqdx/ui`
