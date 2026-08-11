# MSQDX UI — ChatStepList

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatStepList.tsx` · CSS `.ds-chat-steps*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-step-list.md`  
**Related:** `msqdx-ui-chat-block-panel.md` · `msqdx-ui-chat-chrome.md` · Plexon `step_list` block

## Purpose

Ordered **workflow progress** rows for assistant blocks (`pending` | `running` | `done` | `error`). Compose inside `ChatBlockPanel`. Running steps use shared `Spinner`.

## API

```ts
type ChatStepStatus = 'pending' | 'running' | 'done' | 'error'

type ChatStepItem = {
  id?: string
  label: string
  detail?: string
  status: ChatStepStatus
  /** 0–100; shown only when status is `running`. */
  progress?: number
}
```

- `steps: ChatStepItem[]`
- `className?`

## Typography

| Part | Text role | Size |
|------|-----------|------|
| Label | `body` | default |
| Detail | `meta` | default |

## Non-goals

- Orchestrating workflow state / tool calls (product-owned)
- Interactive step controls (cancel / retry stay in the app)

## Acceptance

1. Stories: Default (mixed statuses), Running. ✅  
2. Tests: renders labels + status attributes. ✅  
3. Exported from `@msqdx/ui`. ✅  
