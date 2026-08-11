# MSQDX UI — ChatBlockPanel

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatBlockPanel.tsx` · CSS `.ds-chat-block-panel*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-block-panel.md`  
**Related:** `msqdx-ui-chat-block-list.md` · `msqdx-ui-chat-chrome.md` · `msqdx-ui-chat-overlay.md`

## Purpose

Domain-free **assistant message block shell**: eyebrow + compact title + body, on `Panel variant="default"`. Used so Storybook (and products) can browse generative UI chrome without Plexon-only copies.

## Typography

| Part | Text role | Size |
|------|-----------|------|
| Eyebrow | `meta` | default |
| Title | `title` | `xl` |
| Body (slot) | product / list | — |

## API

- `title?: string`
- `eyebrow?: string`
- `infoTooltip?: string` (+ optional `infoTooltipAriaLabel`)
- `flush?: boolean` — body padding off
- `children` — block body
- `className?`

## Non-goals

- Streaming / conversation state
- Product report schemas (finding severity mapping stays in the app if needed beyond `badge`/`tone` on list items)

## Acceptance

1. Storybook stories: Default, Findings (composed with list), InOverlay. ✅  
2. Unit tests cover title + eyebrow render. ✅  
3. Exported from `@msqdx/ui`. ✅  
