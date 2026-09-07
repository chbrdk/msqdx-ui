# MSQDX UI — ToolButton

**Status:** Active  
**Layer:** Atoms  
**Origin:** VIDEON NLE tool / transport chrome

## Purpose

Compact icon-only control for toolbars and transport bars. Domain-free: no playback semantics.

## API

- `label` (required): accessible name (`aria-label` / `title`)
- `active?: boolean`
- `size?: 'sm' | 'md'`
- `children`: icon or short glyph
- Standard button attrs (`disabled`, `onClick`, …)

## Acceptance

1. Renders a `<button type="button">` with `ds-tool-button`.
2. Active state uses `data-active` / `is-active` for CSS.
3. Consuming apps import from `@msqdx/ui` (not a local clone of `.videon-nle__tool-btn`).
