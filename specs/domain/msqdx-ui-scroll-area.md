# MSQDX UI — ScrollArea

**Status:** Accepted — 2026-08-01  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ScrollArea.tsx` · hairline rules in `css/base.css` (`.ds-scroll`)  
**Related tokens:** `--scrollbar-size`, `--scrollbar-thumb*`, `--scrollbar-track`

## Purpose

Opt-in scrollport with hairline scrollbars. Avoids styling `*::-webkit-scrollbar` (forces classic gutters on every overflow surface, including textareas).

## API

| Prop | Type | Notes |
|------|------|-------|
| `as` | element type | Default `div` |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | Maps to overflow CSS |
| `children` | `ReactNode` | |
| `className` | `string` | Always includes `ds-scroll` |

## Rules

1. Prefer standard `scrollbar-width` / `scrollbar-color` (no universal WebKit pseudos).  
2. Known product scrollports may also opt in via class (`.chat-turns`, journey viewports).  
3. Form controls never get forced classic chrome.

## Acceptance

1. Story shows overflow content with thin scrollbar.  
2. Unit test asserts `.ds-scroll` class.  
3. Documented in completeness / foundation knowledge.
