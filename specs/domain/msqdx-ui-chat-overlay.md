# MSQDX UI — ChatOverlay

**Status:** Accepted — 2026-08-10  
**Layer:** Organisms  
**Implements:** `packages/ui/src/components/ChatOverlay.tsx` · `packages/ui/src/css/chat.css`  
**Related:** `specs/domain/msqdx-ui-chat-chrome.md` · Plexon `central-assistant-flyout.md`  
**Knowledge:** `knowledge/components/chat-overlay.md`

## Purpose

Domain-free **chat flyout / overlay shell** for product hosts (central platform Assistant, compact product chats). Provides backdrop, sheet placement, header slot, body slot (iframe or composed panel), focus trap, Esc/close — **no** assistant APIs, streams, or message domain logic.

## Placement

| `placement` | Behavior | Classes |
|-------------|----------|---------|
| `dock-end` (default) | Side sheet anchored to inline-end | `.chat-overlay` + `.chat-overlay-sheet` + `.chat-overlay-sheet-dock-end` |
| `center` | Centered modal sheet | `.chat-overlay` + `.chat-overlay-sheet` (existing) |

## API

```ts
type ChatOverlayPlacement = 'dock-end' | 'center'

type ChatOverlayProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  /** Accessible name when title is visual-only / omitted */
  ariaLabel?: string
  placement?: ChatOverlayPlacement // default 'dock-end'
  /** Optional header actions (history, expand, …) */
  headerActions?: ReactNode
  children: ReactNode
  className?: string
  /** Called after Esc / backdrop / close control */
  onClose?: () => void
}
```

## Behavior

1. When `open` is false, render nothing (or inert portal stub — prefer nothing).
2. Backdrop click and Esc call `onOpenChange(false)` and `onClose`.
3. Close control in header (`.chat-close`) with accessible name “Close”.
4. Focus moves into the sheet on open; restore focus to previously focused element on close.
5. `role="dialog"` + `aria-modal="true"` on the sheet.

## Non-goals

- Message list, composer, stream client, or orchestrator hooks.
- Replacing product full-page `.chat-panel-open` workspaces.
- Replacing icon-anchored `Flyout` popovers (history/share).

## Acceptance

1. Spec + knowledge + catalog entry.
2. Stories: dock-end, center, with iframe slot stub.
3. Unit tests: open/close, Esc, backdrop, placement class.
4. Exported from `@msqdx/ui` package index.
5. Consumers (Plexon `PlatformAssistantHost`, product shells) import `ChatOverlay` — no parallel overlay chrome.
