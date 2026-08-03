# Lede + FilterRow + Panel (magazine primitives)

**Date:** 2026-08-03  
**Specs:** `specs/domain/msqdx-ui-lede.md`, `specs/domain/msqdx-ui-filter-row.md`, Panel in `specs/domain/msqdx-ui-foundation.md`

## Lede / LedeStrip

- One primitive for KPI bands and wizard steps (`variant="metrics"|"steps"`).
- Aliases: `StatLede`/`StatLedeGroup`, `WizardSteps` (deprecated thin wrappers).
- Prefer `Lede` + `LedeStrip` in new product code.

## FilterRow

- Default `variant="magazine"`: hairline band + chip row.
- `variant="toolbar"` for dense ops.
- Children: prefer `Chip` with `selected` (underline language).

## Panel

| Variant | Use |
|---------|-----|
| `editorial` (default) | Magazine chapter band — top hairline, fill-free, **square** (`border-radius: 0`) |
| `flush` | No chrome |
| `card` | Square hairline collection tile (no wash) |
| `default` | Ops wash only (`--surface-2` + `--radius-panel`) |

**Cascade note (2026-08-03):** Variants use `.ds-panel.ds-panel--*` so they beat the dual `.module-panel` alias. Bare `.module-panel` is also magazine-neutral — wash is not the alias default.

## Product cutover

- **audion-v3:** edit wizards → `LedeStrip variant="steps"`; wave/queue stats → `Lede`/`LedeStrip`; collection tiles → `Panel variant="card"`.
- **checkion-v3:** interactive filters → `FilterRow`+`Chip`; home snapshot → `Lede`; cover tag rows may keep local chip-row CSS.
- **plexon-v3:** admin overview → `Lede`/`LedeStrip`.
