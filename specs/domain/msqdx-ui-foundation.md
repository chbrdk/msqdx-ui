# MSQ DX v2 — Foundation primitives (product UI)

**Status:** Accepted — 2026-07-28  
**ADR:** 0028 §17  
**Knowledge:** `knowledge/msqdx-ui-completeness.md`  
**Implements:** Panel, MetricChip, PageTitle, Textarea, ToggleGroup, Hint, FilterRow, StatusDot, Alert, LoadingText, EmptyState under `design-system/components/`

## Goals

1. Close the DS foundation bar (chrome + feedback + form extras) without page-parity work.
2. Dual-class legacy aliases (`.module-panel`, `.metric-chip`, `.page-title`, `.status-dot`, `.error`/`.ok`, `.filter-row`, `.hint`).
3. Tokens only for new CSS in `css/primitives.css`.

## Non-goals

- Signal detail / Chat sheet redesign.
- Tabs, dialogs, toasts, tables (later).

## Primitive map

| Component | Legacy alias | Notes |
|-----------|--------------|-------|
| `Panel` | `.module-panel` | Magazine chapter band by default (`editorial`); wash via `variant="default"` |
| `MetricChip` | `.metric-chip` | OpsStrip KPI |
| `PageTitle` | `.page-title` | topbar h1 |
| `Textarea` | — | Field family; native textarea |
| `ToggleGroup` | `.locale-toggle` | Chip-based exclusive select; `variant="icon"` for square icon chips |
| `Hint` | `.hint` / `.panel-hint` | mono click-path |
| `FilterRow` | `.filter-row` | wrap chips/fields |
| `StatusDot` | `.status-dot` | ok/warn/critical |
| `Alert` | `.error` / `.ok` | inline status text |
| `LoadingText` | `.meta` loading | role=status |
| `EmptyState` | `.meta` empty | muted body |

## Acceptance

1. All exported from `design-system/index.ts`.
2. Storybook entries + unit tests per primitive (or grouped Foundation stories).
3. Pilots: OpsStrip→MetricChip, TopStatus→StatusDot, Locale/Theme→ToggleGroup, App→PageTitle, ≥1 Panel + Button ghost cutover.
4. Completeness doc marks foundation batch done.
