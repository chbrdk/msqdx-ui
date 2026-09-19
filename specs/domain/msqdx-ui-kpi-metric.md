# MSQDX UI — KpiMetric

**Status:** Accepted — 2026-09-19  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/KpiMetric.tsx`  
**Consumers:** METRON dashboard widgets + viewer/share hero strip (inside `Panel variant="card"` / joined `WidgetGrid`)  
**Related:** `msqdx-ui-lab-tile.md` · `msqdx-ui-widget-grid.md` · `knowledge/metric-languages.md`

## Purpose

**Shell-free** magazine KPI readout: label + display value (+ optional meta/unit). No border, radius, or card chrome — compose inside sharp `Panel variant="card"` on a joined WidgetGrid board.

## API

```ts
type KpiMetricDensity = 'default' | 'hero'

type KpiMetricProps = {
  label: ReactNode
  value: ReactNode
  meta?: ReactNode
  unit?: ReactNode
  density?: KpiMetricDensity // default 'default'
  className?: string
}
```

## Presentation

- Label: muted meta / uppercase micro via existing Text roles (or `.ds-kpi-metric__label`)
- Value: light weight, tabular nums, letter-spacing tighten; `default` ≈ 1.85rem; `hero` = `clamp(2.35rem, 4vw, 3rem)`
- Optional unit inline after value; meta below as muted line
- Transparent background — parent owns shell

## Non-goals

- Soft `--radius-tile` shells → use `LabTile`
- Ops overview strips → use `KpiStrip`
- Chart / Gauge visuals
- Evaluate / `kpiId` binding (app domain)

## Acceptance

1. Stories: Default + Hero (+ optional InPanel)
2. Unit tests for density class + label/value
3. Exported from `@msqdx/ui`
4. METRON canvas / viewer / share consume `KpiMetric` (no `.metron-dashboard-kpi-tile*` value chrome)
