# Metric languages — LabTile vs KpiMetric vs KpiStrip

**Date:** 2026-09-19 · Specs: `msqdx-ui-lab-tile.md` · `msqdx-ui-kpi-metric.md` · `msqdx-ui-overview-surfaces.md`

## Decision

Three Collection metric surfaces — pick by **shell**, not by product:

| Primitive | Shell | Use when |
|-----------|--------|----------|
| **LabTile** (+ `LabTileStrip`) | Soft `--radius-tile`, gapped | Checks / Quickscan / wave metrics — floating soft cards |
| **KpiMetric** | None (content only) | Magazine dashboards — inside sharp `Panel variant="card"` on `WidgetGrid joined` |
| **KpiStrip** | Soft `.kpi-card` row | Ops / overview workstation strips |

## Explicit anti-patterns

- Do **not** put LabTile on METRON dashboard boards (hairline-joined magazine language).
- Do **not** invent app-local `.…-kpi-tile__value` typography when `KpiMetric` exists.
- Do **not** use `KpiStrip` as a Metron dashboard hero board — use Panel cards + `KpiMetric density="hero"`.

## Joined boards

`WidgetGrid joined` + `layoutJoinedBoardEdges` = internal hairlines only (no outer frame). See `msqdx-ui-widget-grid.md`.
