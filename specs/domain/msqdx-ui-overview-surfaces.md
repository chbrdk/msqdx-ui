# MSQ DX UI Overview Surfaces

## Purpose

Shared dashboard-style surfaces for calm workstation layouts inspired by ECHON V3.

## Primitives

- `TopStatus`: quiet topbar health/status line
- `KpiStrip`: dense KPI cards row
- `PipelinePanel`: lane + operation panel for queue/workflow style overviews
- `StatusMeterPanel`: banner + meter grid for health/capacity views

## Rules

- Product data stays outside the component API; consumers pass already derived values.
- Visual tone uses existing `kpi-strip`, `pipeline-*`, `system-banner`, and `meter-*` classes.
- Use with `Panel`/`SectionChrome` composition and workstation-first layouts.
