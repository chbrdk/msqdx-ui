# MSQDX UI — ChatQuoteList

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatQuoteList.tsx` · CSS `.ds-chat-quotes*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-quote-list.md` · `knowledge/chat-journey-gaps.md`  
**Related:** Audion journey validate `phaseQuotes` · `ChatBlockList`

## Purpose

Quote-shaped assistant rows (persona voice / friction / recommendation attribution) for journey validate and similar chat outputs.

## API

```ts
type ChatQuoteItem = {
  quote: string
  attribution?: string
  context?: string
  tone?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
}
```

- `items: ChatQuoteItem[]`
- `className?`

## Acceptance

1. Stories: ValidateQuotes, InPanel. ✅  
2. Tests: quote + attribution. ✅  
3. Exported from `@msqdx/ui`. ✅  
