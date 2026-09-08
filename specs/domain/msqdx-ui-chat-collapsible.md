# MSQDX UI — ChatCollapsible

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatCollapsible.tsx` · CSS `.ds-chat-collapsible*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-collapsible.md`  
**Related:** `Accordion` · Plexon `collapsible`

## Purpose

Single **disclosure** for long assistant detail (markdown body as `children` — product owns markdown rendering).

## API

```ts
type ChatCollapsibleProps = {
  title: string
  defaultOpen?: boolean
  /** `compact` for inspect/property rails — sm trigger + inline padding. Default stays chat-flush. */
  density?: 'default' | 'compact'
  children?: ReactNode
  className?: string
}
```

## Acceptance

1. Stories: Closed, Open. ✅  
2. Tests: expands on click. ✅  
3. Exported from `@msqdx/ui`. ✅  
4. WHEN `density="compact"` THEN the trigger MUST use `Button` size `sm`, keep readable left/right padding, and MUST NOT use title/`xl` type — for property/inspect rails.