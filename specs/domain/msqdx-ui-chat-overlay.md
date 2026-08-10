# MSQDX UI — ChatOverlay

**Status:** Accepted — 2026-08-10 (dock-end resizable)  
**Layer:** Organisms  
**Implements:** `packages/ui/src/components/ChatOverlay.tsx` · `packages/ui/src/css/chat.css`  
**Related:** `specs/domain/msqdx-ui-chat-chrome.md` · Plexon `central-assistant-flyout.md`  
**Knowledge:** `knowledge/components/chat-overlay.md`

## Purpose

Domain-free **chat flyout / overlay shell** for product hosts (central platform Assistant, compact product chats). Provides backdrop, sheet placement, header slot, body slot (**composed panel or iframe**), focus trap, Esc/close — **no** assistant APIs, streams, or message domain logic.

## Placement

| `placement` | Behavior | Classes |
|-------------|----------|---------|
| `dock-end` (default) | Side sheet anchored to inline-end; default width `min(32rem, 100%)`, drag-resizable | `.chat-overlay` + `.chat-overlay-sheet` + `.chat-overlay-sheet-dock-end` |
| `center` | Centered modal sheet | `.chat-overlay` + `.chat-overlay-sheet` (existing) |

## Surfaces (tokens)

Sheet MUST use design tokens so light/dark follow host `data-theme`:

- Background: `var(--panel)` or `var(--bg1)` (prefer `--panel` when defined)
- Border: `var(--line)`
- Title ink: `var(--ink)`
- Backdrop: `var(--overlay-scrim)`

No hardcoded light/dark hex in overlay chrome.

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
  /** Dock-end only; default true */
  resizable?: boolean
  defaultWidth?: number // px, default 512 (32rem)
  width?: number // controlled px
  onWidthChange?: (width: number) => void
  minWidth?: number // default 320
  maxWidth?: number // default 1024, also capped to ~92vw
  widthStorageKey?: string | null // default 'msqdx-chat-overlay-width'; null disables
}
```

## Behavior

1. When `open` is false, render nothing (or inert portal stub — prefer nothing).
2. Backdrop click and Esc call `onOpenChange(false)` and `onClose`.
3. Close control in header (`.chat-close`) with accessible name “Close”.
4. Focus moves into the sheet on open; restore focus to previously focused element on close.
5. `role="dialog"` + `aria-modal="true"` on the sheet.
6. Body children may be an in-process chat panel **or** a full-height iframe; `.chat-overlay-body > iframe` fills remaining height.
7. Dock-end sheets expose an inline-start resize handle (`.chat-overlay-resize`, `role="slider"`). Dragging (or arrow keys) updates `--chat-overlay-sheet-width`; width persists to `localStorage` unless `widthStorageKey` is `null`.

## Non-goals

- Message list, composer, stream client, or orchestrator hooks.
- Replacing product full-page `.chat-panel-open` workspaces.
- Replacing icon-anchored `Flyout` popovers (history/share).
- Theme persistence / `data-theme` ownership (host / product concern).

## Acceptance

1. Spec + knowledge + catalog entry.
2. Stories: dock-end, center, with iframe slot stub **and** composed panel stub.
3. Unit tests: open/close, Esc, backdrop, placement class, dock-end width class present, resize handle + drag width.
4. Exported from `@msqdx/ui` package index.
5. Consumers (Plexon `PlatformAssistantHost`, product shells) import `ChatOverlay` — no parallel overlay chrome.
