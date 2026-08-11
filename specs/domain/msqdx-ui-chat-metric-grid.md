# MSQDX UI — ChatMetricGrid

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatMetricGrid.tsx` · CSS `.ds-chat-metric-grid*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-metric-grid.md`  
**Related:** `msqdx-ui-chat-block-panel.md` · `msqdx-ui-chat-chrome.md` · Plexon `metric_grid` block

## Purpose

Domain-free **KPI tile grid** for assistant message blocks (scores, counts, short metrics). Compose inside `ChatBlockPanel`.

## API

```ts
type ChatMetricTone = 'success' | 'warning' | 'error' | 'info' | 'neutral'

type ChatMetricItem = {
  label: string
  value: string | number
  unit?: string
  hint?: string
  tone?: ChatMetricTone
}
```

- `items: ChatMetricItem[]`
- `className?`

## Typography

| Part | Text role | Size |
|------|-----------|------|
| Label | `meta` | default |
| Value | `title` | `xl` |
| Unit / hint | `meta` | default |

## Non-goals

- Chart rendering (see future `ChatChart`)
- Product score interpretation / thresholds

## Acceptance

1. Stories: Default, WithTones (composed in panel). ✅  
2. Unit tests render labels + values. ✅  
3. Exported from `@msqdx/ui`. ✅  
