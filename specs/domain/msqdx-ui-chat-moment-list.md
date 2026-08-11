# MSQDX UI — ChatMomentList

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatMomentList.tsx` · CSS `.ds-chat-moments*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-moment-list.md` · `knowledge/chat-journey-gaps.md`  
**Related:** Audion `JourneyPhaseElement` kinds · `ChatBlockList`

## Purpose

Typed **journey moment / element** rows (`action` | `thought` | `feeling` | `pain` | `opportunity` | `other`) for assistant blocks. Kind is chrome (chip), not product schema.

## API

```ts
type ChatMomentKind =
  | 'action'
  | 'thought'
  | 'feeling'
  | 'pain'
  | 'opportunity'
  | 'other'

type ChatMomentItem = {
  id?: string
  kind: ChatMomentKind
  label: string
}
```

- `items: ChatMomentItem[]`
- `alternating?: boolean` (default true)
- `className?`

## Acceptance

1. Stories: MixedKinds, InPanel. ✅  
2. Tests: labels + kind chips. ✅  
3. Exported from `@msqdx/ui`. ✅  
