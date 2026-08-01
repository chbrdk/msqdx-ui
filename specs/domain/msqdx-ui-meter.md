# MSQDX UI — Meter / MeterList

**Status:** Accepted — 2026-08-01  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/Meter.tsx` · `packages/ui/src/css/slider.css` (shared with Slider)  
**Depends on:** `Slider`, `Text`  
**Consumers:** AUDION persona traits / research profile / journey dimensions

## Purpose

Labeled editable meter row: **label · optional hint · value readout · Slider**.  
`MeterList` is the vertical stack (magazine trait list pattern).

Not a replacement for `StatusMeterPanel` (system-load / read-only ops chrome).

## API — Meter

| Prop | Type | Notes |
|------|------|-------|
| `label` | `ReactNode` | Primary label |
| `hint` | `ReactNode` | Optional muted suffix / secondary line |
| `valueLabel` | `ReactNode` | End readout (e.g. `50%`) |
| `value` / `min` / `max` / `step` | `number` | Passed through to `Slider` |
| `onChange` / `onCommit` | `(n: number) => void` | |
| `disabled` | `boolean` | |
| `id` | `string` | Optional; wires label `htmlFor` |

## API — MeterList

| Prop | Type | Notes |
|------|------|-------|
| `children` | `ReactNode` | `Meter` rows |
| `aria-label` | `string` | List name |

Markup: `ul.ds-meter-list` > `li.ds-meter` > head + `Slider`.

## Acceptance

1. Stories: single meter, list of dimensions, disabled.  
2. Tests: renders label + valueLabel; slider commit fires.  
3. Apps use `Meter` / `MeterList` instead of `.audion-magazine-meters` + product range CSS.
