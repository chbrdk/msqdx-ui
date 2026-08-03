# MSQ DX v2 — Toast / DataTable / Avatar

**Status:** Accepted — 2026-07-28 · Implemented 2026-07-28 · Avatar square default 2026-08-03  
**ADR:** 0028 §20 (amended)  
**Knowledge:** `knowledge/msqdx-ui-feedback-data.md`  
**Implements:** `Avatar`, `Toast` (+ `ToastProvider` / `useToast`), `DataTable` under `design-system/components/` · CSS `css/extended.css`

## Goals

1. Close deferred feedback / data-display primitives so product UI can consume them without inventing one-offs.
2. Accessible defaults: Avatar initials + alt; Toast live regions (polite/assertive); DataTable semantic `<table>` + sort.

## Non-goals

- TanStack Table / virtualization (keep lean HTML table).
- Multi-region toast portals across windows.
- User-directory Avatar CDN.

## Primitive map

| Component | Layer | Notes |
|-----------|-------|--------|
| `Avatar` | Atom | Image or initials; sizes `sm`/`md`/`lg`; **shape** `square` (default, magazine) \| `round` (lists) |
| `Toast` + `ToastProvider` / `useToast` | Molecule | Pre-mounted polite + assertive live regions; no focus steal |
| `DataTable` | Organism | Columns + rows; optional sort; empty slot |

## Acceptance

1. Exported from `design-system/index.ts`.
2. Atomic Storybook entries + unit tests.
3. `ToastProvider` mounted in product `App` shell.
4. Completeness marks Wave E done.
