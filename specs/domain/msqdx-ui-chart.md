# MSQDX UI — Chart

**Status:** Accepted — 2026-09-14 (chart family)  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/Chart.tsx`  
**Consumers:** METRON dashboards (and future suite analytics)

## Purpose

Domain-free **categorical chart family** for Collection dashboards. Uses design-system chart tokens (`--chart-*` / `forestChart` palette) — no Recharts/visx dependency in Phase 1.

## API

```ts
type ChartPoint = { label: string; value: number }

type ChartVariant =
  | 'bar'
  | 'bar_horizontal'
  | 'line'
  | 'area'
  | 'scatter'
  | 'pie'
  | 'donut'
  | 'funnel'

type ChartProps = {
  variant?: ChartVariant // default 'bar'
  data: ChartPoint[]
  title?: string
  height?: number
  valueFormatter?: (n: number) => string
  onPointClick?: (point: ChartPoint, index: number) => void
  showTicks?: boolean
  showValueLabels?: boolean
  className?: string
}
```

## Variants (single-series)

| Variant | Shape |
|---------|--------|
| `bar` | Vertical columns |
| `bar_horizontal` | Horizontal bars |
| `line` | Polyline + dots |
| `area` | Filled area under line |
| `scatter` | Dots only |
| `pie` | Full pie slices |
| `donut` | Pie with inner hole |
| `funnel` | Decreasing stage bars (top → bottom) |

Still one `ChartPoint[]` binding — no multi-series / dual-axis yet.

## Presentation

- Compact SVG ticks / value labels where the geometry allows  
- Legend table: category labels regular weight; values larger + light weight  
- Hover sync: table row ↔ chart mark (`--active` / `--dim`)  
- `formatChartValue` trims floats  
- Interactive clicks when `onPointClick` is set  

## Non-goals

- Visual marketplace / every possible BI mark (maps, treemap, candlestick, 3D)  
- Multi-series stacking / dual axes (later wave)  
- Product KPI evaluation (belongs in METRON)

## Acceptance

1. Stories for each variant + Empty  
2. Unit tests cover bar, pie, funnel marks + legend + `onPointClick` + linked hover  
3. Exported from `@msqdx/ui`
