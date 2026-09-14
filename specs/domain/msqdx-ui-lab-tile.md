# MSQDX UI — LabTile (soft value cards)

**Status:** Accepted — 2026-09-14  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/LabTile.tsx`  
**Consumers:** CHECKION Checks, PLEXON Event Quick Check, AUDION wave metrics, METRON KPI tiles

## Purpose

One **soft value card** language for Collection metrics: rounded corners, display value, uppercase micro-label — shared across suite products instead of forked `.checkion-lab-tile` / `.plexon-eqc-lab-tile` / hard Metron radii.

## API

```ts
type LabTileTone = 'neutral' | 'pos' | 'low' | 'neg'

type LabTileProps = {
  label: ReactNode
  value: ReactNode
  meta?: ReactNode
  unit?: ReactNode
  tone?: LabTileTone
  className?: string
}
```

Strip helper: `LabTileStrip` lays tiles in a responsive gap grid (not hairline-joined sharp columns).

## Presentation

- Radius: `var(--radius-tile)` (0.85rem) — same token as soft Panel cards / KpiStrip
- Value: `--font-display`, light weight, clamp size, tabular nums
- Label: uppercase micro (`--type-xs`, tracking)
- Optional tone underline on the value (pos/low/neg)

## Non-goals

- Replacing editorial chapter bands (`Panel--editorial`) — those stay flush/sharp
- Multi-series charts (Chart molecule)

## Acceptance

1. Stories + unit tests for tone + strip
2. Exported from `@msqdx/ui`
3. Checkion/Plexon CSS aliases or class migration onto `.ds-lab-tile*`
4. Metron widgets / KpiStrip consume `--radius-tile` (no hard-coded rem)
