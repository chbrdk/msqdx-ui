# MSQDX UI — StepStrip

**Status:** Accepted — 2026-08-01  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/StepStrip.tsx` · `packages/ui/src/css/chat-inspect.css`  
**Related:** `WizardSteps` (compact dialog indicator — different surface)  
**Consumers:** AUDION UX journey step cards; intended for Plexon run timelines

## Purpose

Horizontal, scroll-snap strip of selectable/expandable step cards. Shell only: products fill card bodies (screenshots, channels, observations).

## API — `StepStrip`

| Prop | Type | Notes |
|------|------|-------|
| `children` | `ReactNode` | Prefer `StepStripItem` |
| `header` | `ReactNode` | Optional chrome (e.g. `SectionChrome`) |
| `hint` | `ReactNode` | Muted helper under header |
| `empty` | `ReactNode` | When no items |
| `scrollToIndex` | `number \| null` | Centers that card |
| `scrollerLabel` | `string` | Default `Step cards` |
| `aria-label` | `string` | Section label |

## API — `StepStripItem`

| Prop | Type | Notes |
|------|------|-------|
| `index` | `number` | `data-step-index` for scroll targeting |
| `selected` / `expanded` / `active` | `boolean` | Visual + a11y states |
| `onActivate` | `() => void` | Click / Enter / Space (ignores interactive descendants) |
| `label` | `string` | Accessible name |
| `children` | `ReactNode` | Card body |

CSS vars: `--ds-step-strip-compact`, `--ds-step-strip-expanded`.

## Non-goals

- Domain step schemas, think-aloud fields, journey phase models

## Acceptance

1. Stories: compact / selected / expanded.  
2. Tests: activate callback + scroll target attribute.  
3. Products keep domain content inside items.
