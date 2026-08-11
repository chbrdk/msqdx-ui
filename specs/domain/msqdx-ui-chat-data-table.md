# MSQDX UI — ChatDataTable

**Status:** Accepted — 2026-08-11  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/ChatDataTable.tsx` · CSS `.ds-chat-table*` in `css/chat.css`  
**Knowledge:** `knowledge/components/chat-data-table.md`  
**Related:** `msqdx-ui-chat-block-panel.md` · Plexon `data_table`

## Purpose

Compact **column/row table** for assistant tool results (scan rows, GEO keywords). Simpler than full `DataTable` (no sort client) — chat density, flush-friendly.

## API

```ts
type ChatDataTableProps = {
  columns: string[]
  rows: Array<Array<string | number | null>>
  className?: string
}
```

Compose inside `ChatBlockPanel` with `flush` when desired.

## Acceptance

1. Stories: Default, InPanelFlush. ✅  
2. Tests: headers + cells. ✅  
3. Exported from `@msqdx/ui`. ✅  
