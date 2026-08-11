# MSQDX UI — ChatKeyValueList

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatKeyValueList.tsx` · CSS `.ds-chat-kv*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-key-value-list.md`  
**Related:** `msqdx-ui-chat-block-panel.md` · `msqdx-ui-chat-chrome.md` · Plexon `key_value_list` block

## Purpose

Compact **label → value** rows for assistant detail blocks. Compose inside `ChatBlockPanel`.

## API

```ts
type ChatKeyValueItem = {
  label: string
  value: string | number
}
```

- `items: ChatKeyValueItem[]`
- `alternating?: boolean` (default true)
- `className?`

## Typography

| Part | Text role | Size |
|------|-----------|------|
| Label | `meta` | default |
| Value | `body` | default (semibold via CSS) |

## Non-goals

- Nested objects / recursive trees (`JsonTree` stays separate)
- Editable fields

## Acceptance

1. Stories: Default, InPanel. ✅  
2. Tests: renders labels + values. ✅  
3. Exported from `@msqdx/ui`. ✅  
