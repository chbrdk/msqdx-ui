# MSQDX UI — Chart

**Status:** Accepted — 2026-09-14  
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
  height?: number // default 180
  valueFormatter?: (n: number) => string
  className?: string
}
```

## Accessibility

- Root `role="img"` with `aria-label` from `title` or generated summary
- Hidden HTML table fallback with labels/values for AT

## Non-goals

- Multi-series stacking / dual axes (Wave 6.1+)
- Streaming updates
- Product KPI evaluation (belongs in METRON)

## Acceptance

1. Stories: Bar, Line, Empty  
2. Unit tests render bars/polyline + table fallback  
3. Exported from `@msqdx/ui`
