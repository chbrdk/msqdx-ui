# MSQDX UI — EventFooter

**Status:** Accepted — 2026-08-01  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/EventFooter.tsx` · `packages/ui/src/css/chat-inspect.css`  
**Consumers:** AUDION tool-complete summary under inspect dock; intended for Plexon run completion chrome

## Purpose

Compact, content-width footer after an agent/tool event: summary line, optional meta lines, action row. No card chrome.

## API

| Prop | Type | Notes |
|------|------|-------|
| `summary` | `ReactNode` | Primary muted line |
| `children` | `ReactNode` | Extra meta lines |
| `actions` | `ReactNode` | Links / ghost buttons |
| `className` | `string` | |

## Non-goals

- Scorecard / policy formatting helpers
- Convert-to-journey / recording domain CTAs (passed as `actions`)

## Acceptance

1. Stories: summary only · summary + meta + actions.  
2. Unit test asserts structure classes.  
3. Products stop reimplementing `.audion-chat-tool-complete` layout.
