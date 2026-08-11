# MSQDX UI — ChatLinkList

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatLinkList.tsx` · CSS `.ds-chat-links*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-link-list.md`  
**Related:** `msqdx-ui-chat-block-panel.md` · Plexon `link_list`

## Purpose

Compact **next-step / deep-link** rows for assistant blocks. Compose inside `ChatBlockPanel`.

## API

```ts
type ChatLinkItem = {
  label: string
  href: string
  external?: boolean
}
```

- `links: ChatLinkItem[]`
- `className?`

## Acceptance

1. Stories: Default, InPanel. ✅  
2. Tests: renders labels + hrefs. ✅  
3. Exported from `@msqdx/ui`. ✅  
