# MSQDX UI — InspectDock

**Status:** Accepted — 2026-08-01  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/InspectDock.tsx` · `packages/ui/src/css/chat-inspect.css`  
**Consumers:** AUDION chat inspect band; intended for Plexon agent inspect

## Purpose

Domain-free band that sits inside a chat/message stream to host agent inspection chrome (step strip, live preview, event footer). Visual separator only — no product contracts.

## API

| Prop | Type | Notes |
|------|------|-------|
| `children` | `ReactNode` | Step strip, footers, live frames |
| `as` | `ElementType` | Default `div` |
| `aria-label` | `string` | Required for landmark clarity |
| `className` | `string` | |

## Non-goals

- Tool approval cards, streaming protocol, journey conversion CTAs
- Think-aloud / scorecard formatting

## Acceptance

1. Stories show empty + stacked children.  
2. Unit test asserts `.ds-inspect-dock`.  
3. Products compose children; no duplicate border/padding chrome.
