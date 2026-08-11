# MSQDX UI — ChatAlertBlock

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatAlertBlock.tsx` · CSS `.ds-chat-alert*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-alert-block.md`  
**Related:** foundation `Alert` · Plexon `alert`

## Purpose

In-turn **status / warning / error** message with chat panel chrome. Maps chat tones onto shared `Alert` (`error` | `ok` | `info`).

## API

```ts
type ChatAlertTone = 'success' | 'warning' | 'error' | 'info' | 'neutral'

type ChatAlertBlockProps = {
  title?: string
  message: string
  tone?: ChatAlertTone
  className?: string
}
```

## Acceptance

1. Stories: Info, Warning, Error, Success. ✅  
2. Tests: message + role. ✅  
3. Exported from `@msqdx/ui`. ✅  
