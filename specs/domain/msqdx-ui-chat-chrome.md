# MSQ DX v2 — Chat chrome (product UI)

**Status:** Accepted — 2026-07-29 · Open surface promoted 2026-07-29  
**ADR:** 0028 §19  
**Implements:** `packages/ui/src/css/chat.css` · consumers (e.g. AUDION v3 `AudionChatPanel`)  
**Knowledge:** `knowledge/msqdx-ui-chat-chrome.md`  
**Depends on:** Field/Textarea, Button, Text, Hint, Alert, LoadingText, EmptyState

## Goals

1. Chat overlay / compact sheet / full-page open chat consume DS chrome instead of product one-offs.
2. Composer = `<Textarea>` (+ send `<Button>`); status/errors = Alert/LoadingText; empty = EmptyState.
3. Keep chat **turn** typography on type tokens (`--font-display` / `--font-body`).
4. Spec first; CSS SoT in `@msqdx/ui` — products compose markup + data, not duplicate chrome.

## Surfaces

| Mode | Class | Use |
|------|-------|-----|
| Overlay sheet | `.chat-overlay` · `.chat-overlay-sheet` · `.chat-panel-compact` | Modal / drawer chat |
| Open editorial | `.chat-panel.chat-panel-open` | Full-page conversation (no card) |

## Anatomy

| Part | Treatment |
|------|-----------|
| Composer input | `<Textarea size="md" block className="chat-composer">` (DS field face: light frame + bottom rule) |
| Send (sheet / open) | `<Button variant="ghost" size="sm" className="chat-send chat-send-icon" icon={<IconSend />} aria-label="Send" />` |
| Send (text pill, optional) | `<Button variant="primary" size="sm" shape="pill" className="chat-send">` |
| Empty / loading | `<EmptyState className="chat-empty">` / `<LoadingText>` |
| Errors | `<Alert tone="error">` |
| Turns | `.chat-turn-user` (end) · `.chat-turn-assistant` (start) under open |
| Expand composer | `.chat-form` + `:hover` / `:focus-within` / `.is-expanded` (open only) |

### Open surface tokens (CSS vars)

| Var | Default | Role |
|-----|---------|------|
| `--chat-composer-collapsed` | `min(28rem, 100%)` | Idle composer width |
| `--chat-composer-expanded` | `min(52rem, 100%)` | Hover/focus/draft width |
| `--chat-panel-open-min-height` | `auto` | Product shell offset (e.g. `calc(100vh - 10.5rem)`) |

## Related shells (2026-08-01)

Agent inspect chrome (domain-free): `InspectDock` · `StepStrip` · `ChannelStack` · `EventFooter` — see `msqdx-ui-inspect-dock.md` et al. · `css/chat-inspect.css`.

## React overlay shell (2026-08-10)

Shared organism **`ChatOverlay`** — see `specs/domain/msqdx-ui-chat-overlay.md`.  
Domain-free backdrop + sheet (`dock-end` | `center`) for host mounts (e.g. central platform Assistant).

## Message blocks (2026-08-11)

Presentational generative UI chrome (browseable in Storybook):

| Primitive | Storybook |
|-----------|-----------|
| `ChatBlockPanel` | `Molecules/ChatBlockPanel` |
| `ChatBlockList` | `Molecules/ChatBlockList` |
| `ChatMetricGrid` | `Molecules/ChatMetricGrid` |
| `ChatKeyValueList` | `Molecules/ChatKeyValueList` |
| `ChatStepList` | `Molecules/ChatStepList` |
| `ChatLinkList` | `Molecules/ChatLinkList` |
| `ChatAlertBlock` | `Molecules/ChatAlertBlock` |
| `ChatDataTable` | `Molecules/ChatDataTable` |
| `ChatCollapsible` | `Molecules/ChatCollapsible` |
| `ChatEntityGrid` | `Molecules/ChatEntityGrid` |
| `ChatPhaseStrip` | `Molecules/ChatPhaseStrip` |
| `ChatMomentList` | `Molecules/ChatMomentList` |
| Catalog (overlay + turns + blocks) | `Organisms/ChatCatalog` |

Streaming / conversation client remains product-owned.

## Non-goals (this pass)

- Shipping a shared React **conversation client** / MessageList stream in `@msqdx/ui` (chrome + presentational blocks only).
- Domain tool-trace / think-aloud field mapping (product-owned; shells above).
- New toast/modal system.

## Acceptance

1. Spec + knowledge linked from completeness / ADR. ✅  
2. `chat.css` includes overlay + `.chat-panel-open` editorial chrome. ✅  
3. Guard: `packages/ui/src/chatChrome.test.ts`. ✅  
4. `IconSend` exported from package icons. ✅  
5. Product chat pages use DS classes; product CSS limited to shell/persona chrome.  
6. `Flyout` + chat action icons (`IconShare` / `IconHistory` / `IconMoodboard` / `IconMic` / `IconVideo`) — 2026-07-30. ✅  
7. `ChatOverlay` organism shipped for flyout hosts — 2026-08-10. ✅  
8. `ChatBlockPanel` + `ChatBlockList` + Storybook catalog — 2026-08-11. ✅  
9. `ChatMetricGrid` + `ChatKeyValueList` + `ChatStepList` — 2026-08-11. ✅  
10. `ChatLinkList` + `ChatAlertBlock` + `ChatDataTable` + `ChatCollapsible` + `ChatEntityGrid` — 2026-08-11. ✅  
11. `ChatPhaseStrip` + `ChatMomentList` (Audion journey outline) — 2026-08-11. ✅  
