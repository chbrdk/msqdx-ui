# MSQDX UI — Card

**Status:** Active  
**Layer:** Atoms  
**Companion:** `specs/domain/msqdx-ui-card-actions.md`, `specs/domain/msqdx-ui-surface-clip.md`

## Purpose

Shared composition surface for browse/index tiles and content blocks. Distinct from:

- `HubIndexCard` — magazine hub headlines (project/capability tiles)
- `EntityCard` — Brandion catalog / token specimen chrome

## Guarantees

1. WHEN only `children` are passed THEN `Card` MUST render a plain `ds-card` surface (backward compatible).
2. WHEN `media` / `title` / `meta` / `actions` are used THEN they MUST compose into the documented slots without inventing app-local card chrome.
3. WHEN `href` is set THEN the primary media+title block MUST be a single link; `actions` MUST stay outside that link (no nested interactive controls).
4. `CardActions` MUST be the default footer action row when action buttons are needed.

## API

| Prop | Role |
|------|------|
| `media` | Optional 16:9 preview plane |
| `title` | Compact title (not magazine headline) |
| `meta` | Status / chips / secondary facts |
| `actions` | Typically `<CardActions>…</CardActions>` |
| `href` | Optional primary navigation for media+title |
| `children` | Extra body content |
| `clipInset` | Optional surface clip-path |

## Acceptance

1. Stories cover Default, MediaBrowse, and clipInset.
2. Unit tests cover children, media+href, and clipInset.
3. Consuming apps import `Card` / `CardActions` from `@msqdx/ui`.
