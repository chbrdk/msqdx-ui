# MSQDX UI — ChatEntityGrid

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatEntityGrid.tsx` · CSS `.ds-chat-entity-grid*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-entity-grid.md`  
**Related:** `EntityCard` · Plexon `persona_card` / `target_group_card` · Audion / Brandion teasers

## Purpose

Domain-free **entity card grid** for chat (personas, audiences, token/entity teasers). Composes `EntityCard`. No product IDs or confidence math in the DS.

## API

```ts
type ChatEntityAccent = 'green' | 'pink' | 'orange' | 'purple' | 'yellow' | 'neutral'

type ChatEntityItem = {
  id: string
  title: string
  subtitle?: string
  description?: string
  badge?: string
  tags?: string[]
  accent?: ChatEntityAccent
  href?: string
}
```

- `items: ChatEntityItem[]`
- `fullWidth?: boolean` — single column
- `className?`
- `onItemActivate?: (item: ChatEntityItem) => void` — if unset and `href` set, opens in new tab

## Acceptance

1. Stories: Personas, Audiences (Brandion/Audion-shaped demos). ✅  
2. Tests: titles + badges. ✅  
3. Exported from `@msqdx/ui`. ✅  
