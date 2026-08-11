# MSQDX UI — ChatBlockList

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatBlockList.tsx` · CSS `.ds-chat-block-list*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-block-list.md`  
**Related:** `msqdx-ui-chat-block-panel.md`

## Purpose

Compact **title + prose** rows for assistant blocks (findings, recommendations, similar). Matches chat density: item title `title@lg`, description `meta`.

## API

```ts
type ChatBlockListItem = {
  title: string
  description?: string
  badge?: string
  tone?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
}
```

- `items: ChatBlockListItem[]`
- `alternating?: boolean` (default true) — zebra rows
- `className?`

## Acceptance

1. Stories: Findings, Recommendations. ✅  
2. Tests: renders titles + optional badge. ✅  
3. Exported from `@msqdx/ui`. ✅  
