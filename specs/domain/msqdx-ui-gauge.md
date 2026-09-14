# MSQDX UI — Gauge

**Status:** Accepted — 2026-09-14  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/Gauge.tsx`  
**Consumers:** METRON Wave 6 dashboards

## Purpose

Domain-free **arc gauge** for a single numeric measure (0–max), token-colored.

## API

```ts
type GaugeTone = 'neutral' | 'ok' | 'warn' | 'bad'

type GaugeProps = {
  value: number
  min?: number // default 0
  max?: number // default 100
  label?: string
  unit?: string
  tone?: GaugeTone
  className?: string
}
```

## Accessibility

- `role="meter"` with `aria-valuemin/max/now` + `aria-label`

## Acceptance

1. Stories: Default, Warn, Full  
2. Unit tests clamp value and expose meter attrs  
3. Exported from `@msqdx/ui`
