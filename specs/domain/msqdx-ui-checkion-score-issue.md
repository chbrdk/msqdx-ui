# Checkion score / issue primitives — msqdx-ui

## Status
Draft / gap for CHECKION v3 island pilot

## Context
CHECKION result magazines need severity and score presentation. Products must not fork Chip/Meter locally.

## Candidates
1. **SeverityChip** — tone map for `critical | serious | moderate | minor` on existing Chip chrome
2. **ScoreStrip** — read-only MeterList variant without editable Slider affordance (or Meter `readOnly` prop)
3. **IssueRow** — optional denser RankedRow preset (rule id + affected count)

## Pilot
`checkion-v3` composes Chip(static) + RankedRow + Meter(disabled) until this spec is implemented in `@msqdx/ui`.

## Non-goals
Product-local score atoms in checkion-v3 without this DS spec.
