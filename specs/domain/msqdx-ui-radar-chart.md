# MSQDX UI — RadarChart

**Status:** Accepted — 2026-09-22  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/RadarChart.tsx`  
**Consumers:** SPIRION craft-metrics overview; ECHON briefing score profile (migration path)

## Purpose

Domain-free **spider / radar** for a small set of 0–1 categorical scores (typically 3–13 axes). Complements the cartesian [`Chart`](msqdx-ui-chart.md) family — not a `Chart` variant (polar layout + vertex labels).

## API

```ts
type ChartPoint = { label: string; value: number }

type RadarChartProps = {
  data: ChartPoint[]
  title?: string
  /** SVG viewBox edge length; default 240 */
  size?: number
  /** Accessible name when `title` is absent */
  ariaLabel?: string
  valueFormatter?: (n: number) => string
  onPointClick?: (point: ChartPoint, index: number) => void
  className?: string
}
```

Values are clamped to `0..1`. Empty `data` renders nothing meaningful (empty frame + a11y note).

## Presentation

- SVG rings at 0.33 / 0.66 / 1, radial axes, filled score polygon
- Vertex labels outside the outer ring
- Visually hidden list for screen readers
- Optional `onPointClick` on axis hit targets (and labels)

## Non-goals

- Multi-series overlay / comparison radars
- 20+ axes (labels collide — aggregate upstream)
- Recharts / visx dependency

## Acceptance

1. Stories: Default (6 axes), ManyAxes (13), Empty, Interactive  
2. Unit tests: clamp, polygon presence, a11y list, `onPointClick`  
3. Exported from `@msqdx/ui`
