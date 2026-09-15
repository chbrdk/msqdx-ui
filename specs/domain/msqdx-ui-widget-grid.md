# MSQDX UI — WidgetGrid

**Status:** Accepted — 2026-09-14  
**Layer:** Organisms  
**Implements:** `packages/ui/src/components/WidgetGrid.tsx`  
**Consumers:** METRON Wave 6 dashboard layout

## Purpose

Constrained **responsive widget layout** (CSS grid, not freeform canvas). Children are opaque widgets (Chart, Gauge, Panel, MetricChip tiles).

## API

```ts
type WidgetGridProps = {
  columns?: 2 | 3 | 4 | 6 | 12 // default 12
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  children?: ReactNode
  className?: string
}

type WidgetGridItemProps = {
  colSpan?: number // default 4
  rowSpan?: number // default 1
  children?: ReactNode
  className?: string
}
```

Compound: `WidgetGrid.Item`.

## Non-goals

- Absolute/freeform canvas parity with Power BI

## Edit chrome (deferred upstream)

METRON owns on-canvas slot underlay, tile reorder, and resize handles in the app
(`metron-v3` `dashboard-canvas` + `grid-layout-edit.ts`). Upstream into `WidgetGrid`
edit mode is a follow-up once that UX is stable — do not block Metron on DS churn.
`GridEditor` remains page metrics for design tools, not dashboard tiles.

## Acceptance

1. Stories: Default 12-col with spans  
2. Unit tests place items with col/row span CSS vars  
3. Exported from `@msqdx/ui`
