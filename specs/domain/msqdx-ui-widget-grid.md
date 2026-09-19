# MSQDX UI — WidgetGrid

**Status:** Accepted — 2026-09-14 (joined board 2026-09-19)  
**Layer:** Organisms  
**Implements:** `packages/ui/src/components/WidgetGrid.tsx` · `packages/ui/src/lib/layout-joined-board-edges.ts`  
**Consumers:** METRON dashboard layout  
**Related:** `msqdx-ui-kpi-metric.md` · `knowledge/metric-languages.md`

## Purpose

Constrained **responsive widget layout** (CSS grid, not freeform canvas). Children are opaque widgets (Chart, Gauge, Panel + `KpiMetric`, …).

## API

```ts
type WidgetGridProps = {
  columns?: 2 | 3 | 4 | 6 | 12 // default 12
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  /** Magazine joined board: gap forced none + hairline chrome on nested `.ds-panel--card`. */
  joined?: boolean
  children?: ReactNode
  className?: string
}

type WidgetGridItemProps = {
  colSpan?: number // default 4
  rowSpan?: number // default 1
  children?: ReactNode
  className?: string
}

type JoinedBoardEdge = {
  rowStart: boolean
  rowEnd: boolean
  lastRow: boolean
}

function layoutJoinedBoardEdges(
  widgets: Array<{ colSpan?: number | null; rowSpan?: number | null }>,
  columns?: number, // default 12
): JoinedBoardEdge[]
```

Compound: `WidgetGrid.Item`.

### Joined board

When `joined` is true:

- Root gets `.ds-widget-grid--joined` (and effectively `gap="none"`).
- Nested `.ds-panel--card` children use **internal hairlines only** (right + bottom); no outer frame, no radius, transparent fill.
- Consumers set `data-row-end` / `data-last-row` (and optionally `data-row-start`) from `layoutJoinedBoardEdges` so last-in-row / last-row drop the matching borders.

## Non-goals

- Absolute/freeform canvas parity with Power BI

## Edit chrome (deferred upstream)

METRON owns on-canvas slot underlay, tile reorder, and resize handles in the app
(`metron-v3` `dashboard-canvas` + `grid-layout-edit.ts`). Upstream into `WidgetGrid`
edit mode is a follow-up once that UX is stable — do not block Metron on DS churn.
`GridEditor` remains page metrics for design tools, not dashboard tiles.

## Acceptance

1. Stories: Default 12-col with spans + Joined board with Panel cards  
2. Unit tests place items with col/row span CSS vars; `joined` class; edges util  
3. Exported from `@msqdx/ui` (`WidgetGrid`, `layoutJoinedBoardEdges`)
