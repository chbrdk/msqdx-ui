# MSQDX UI — ChannelStack / ChannelLane

**Status:** Accepted — 2026-08-01  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChannelStack.tsx` · `packages/ui/src/css/chat-inspect.css`  
**Consumers:** AUDION think-aloud lanes inside step cards; intended for Plexon agent traces

## Purpose

Vertical stack of labeled disclosure lanes (seen / think / next / …). Labels and body content stay product-owned; chrome is shared.

## API — `ChannelStack`

| Prop | Type | Notes |
|------|------|-------|
| `children` | `ReactNode` | `ChannelLane`s |
| `aria-label` | `string` | Optional |

## API — `ChannelLane`

| Prop | Type | Notes |
|------|------|-------|
| `label` | `ReactNode` | Summary label |
| `open` | `boolean` | Controlled open (maps to `<details open>`) |
| `defaultOpen` | `boolean` | Uncontrolled initial |
| `children` | `ReactNode` | Lane body |
| `compact` | `boolean` | Tighter body type |

Click on summary stops propagation so parent card selection is not toggled when collapsing.

## Non-goals

- Fixed channel taxonomies (Gesehenes/Denken/…)
- Markdown rendering

## Acceptance

1. Stories with several lanes.  
2. Test renders labels + open attribute.  
3. Consuming apps import from `@msqdx/ui`.
