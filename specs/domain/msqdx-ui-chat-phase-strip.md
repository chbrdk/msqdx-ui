# MSQDX UI — ChatPhaseStrip

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatPhaseStrip.tsx` · CSS `.ds-chat-phases*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-phase-strip.md` · `knowledge/chat-journey-gaps.md`  
**Related:** `ChatStepList` (workflow ≠ journey map) · Audion `JourneyPhase`

## Purpose

Ordered **journey phase outline** for assistant blocks (chapters with optional summary). Not workflow progress (`ChatStepList`).

## API

```ts
type ChatPhaseStatus = 'upcoming' | 'current' | 'done'

type ChatPhaseItem = {
  id: string
  label: string
  summary?: string
  active?: boolean
  status?: ChatPhaseStatus
}
```

- `phases: ChatPhaseItem[]`
- `className?`
- `onPhaseActivate?: (phase: ChatPhaseItem) => void`

## Acceptance

1. Stories: Default, WithActive, InPanel (journey draft). ✅  
2. Tests: phase labels + active attribute. ✅  
3. Exported from `@msqdx/ui`. ✅  
