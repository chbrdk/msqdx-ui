# Print report primitives wave (P92)

**Spec:** `specs/domain/msqdx-ui-print-report-primitives.md`  
**Mag kit:** amend `specs/domain/msqdx-ui-mag-pdf-kit.md` when implementing  
**Creation:** `creation-v3/specs/domain/print-report-primitives-consume.md`  
**Twins:** `knowledge/print-magazine-twins.md`

## Why

Plexon-agent print/report smokes in Creation look “flat” because Mag silently drops non-Print chrome and today’s chips/tables/quotes cannot express emphasis states, wash bands, numeric columns, or linear process steps.

## Scope cheat sheet

| Phase | Primitive | Prop / type | Twin | Status |
|-------|-----------|-------------|------|--------|
| A | `PrintChip` | `tone`: default \| muted \| accent \| solid | `MagChip` | **Done** |
| B | **new** `PrintCallout` | `variant`: wash \| emphasize \| quiet | `MagCallout` | **Done** |
| C | `PrintTable` | `columnAlign: Array<left\|center\|right>` | `MagTable` via flatten | **Done** |
| D | **new** `PrintSteps` | `orientation`, `emphasisIndex` | `MagSteps` | **Done** |
| E | Creation + Plexon | contracts/flatten + craft playbooks/eval | — | **Done** |

## Locked

- Accent from theme/Brandion print pack — not hardcoded conference pink.  
- Inspect only what HTML **and** Mag honor.  
- No SVG diagram atom in this wave.

## Paths

| Item | Path |
|------|------|
| HTML print | `packages/ui/src/print/` · `packages/ui/src/css/print.css` |
| Mag PDF | `packages/ui/src/mag/` · `magazine/twins.ts` · `magazine/colors.ts` |
| Storybook | `Print/*` stories · Mag docs-only layer |
| Creation flatten | `creation-v3/apps/web/lib/magazine-pdf/` |
| Creation matrix | `creation-v3/knowledge/print-mag-capability-matrix.md` |
| Plexon playbooks | `plexon-v3/lib/assistant/creation-craft-playbooks.ts` |

## Smoke (after each phase)

1. Storybook Print story for the new prop/type.  
2. Mag kit unit/PDF smoke.  
3. Creation: insert via palette → inspect → Mag PDF download → visual check align/tone.
