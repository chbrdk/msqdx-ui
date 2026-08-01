# MSQDX UI — Slider

**Status:** Accepted — 2026-08-01  
**Layer:** Atoms  
**Implements:** `packages/ui/src/components/Slider.tsx` · `packages/ui/src/css/slider.css`  
**Consumers:** AUDION magazine meters (traits, research literacy, journey dimensions, communication tone dial)

## Purpose

Tokenized interactive range control. Replaces unstyled native `input[type=range]` and product one-offs like `.audion-editable-traits-slider`.

Read-only progress bars stay on `StatusMeterPanel` / `.meter-track` — this primitive is **editable**.

## API

| Prop | Type | Notes |
|------|------|-------|
| `value` | `number` | Controlled value |
| `min` / `max` / `step` | `number` | Defaults `0` / `100` / `1` |
| `onChange` | `(value: number) => void` | Continuous while dragging |
| `onCommit` | `(value: number) => void` | mouseup / touchend / blur / arrow keyup |
| `disabled` | `boolean` | |
| `block` | `boolean` | Full width (default true) |
| `aria-label` | `string` | Required when no visible label (prefer wrapping `Meter`) |

Fill track uses CSS var `--ds-slider-pct` (0–100), derived from value/min/max.

## States

- Default / hover / focus-visible (thumb ring via accent)
- Disabled (opacity + no pointer)

## Accessibility

- Native `<input type="range">` for keyboard and AT
- Always expose an accessible name (`aria-label` or associate via `Meter` / `Field`)

## Token dependencies

`--accent`, `--ink`, `--line`, `--paper` / surface, `--motion-hover`

## Acceptance

1. Storybook covers default, disabled, mid/high fill.  
2. Unit tests cover `onChange` / `onCommit`.  
3. Consuming apps import `Slider` from `@msqdx/ui` — no product slider CSS clones.
