# Soft value tiles (LabTile)

**Date:** 2026-09-14

## Decision
Collection metric cards (Checks, Quickscan, dashboard KPIs, hub cards) share one soft language:

- Radius: `--radius-tile` (0.85rem)
- Value: display light + clamp
- Label: uppercase micro / muted
- Layout: gap grid of rounded cards (not sharp hairline columns)

## Primitive
`@msqdx/ui` `LabTile` / `LabTileStrip` · spec `specs/domain/msqdx-ui-lab-tile.md`

## App aliases (CSS bridge until full React cutover)
- CHECKION `.checkion-lab-tile`
- PLEXON `.plexon-eqc-lab-tile`
- AUDION `.audion-tg-card-panel` uses `--radius-tile`
- METRON widgets / KpiStrip consume the same token

## Keep
Editorial chapter bands (`Panel--editorial` / flush) stay sharp — only **value cards** soften.
