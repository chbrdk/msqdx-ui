# TokenPicker empty strip + font preview (msqdx-ui)

**Date:** 2026-08-12  
**Consumer:** creation-v3 (`Dockerfile` `MSQDX_UI_REF`)  
**Spec:** `specs/domain/msqdx-ui-token-picker.md`

## Why

CREATION inspect passed `noneLabel="Clear token"`. The current strip rendered `{value ?? noneLabel}`, so every unbound field looked empty / said “Clear token”. Font family `preview` was a CSS stack used as a color swatch background — unreadable.

## What landed in @msqdx/ui

| Change | Detail |
|--------|--------|
| `emptyLabel` | Strip placeholder when unbound (default `—`). `noneLabel` stays list-only. |
| Strip value | `option.label ?? path ?? emptyLabel` — never `noneLabel`. |
| `fontPreview` | Display-only `font-family` on the value label. Color `preview` remains swatch-only. |
| Swatch | Rendered only when `preview` is set (no checkerboard on type tokens). |
| Inspector Select | Full width inside `.ds-property-inspector` (`min-width: 0`, value `flex: 1`). |

## Pin after push

Fill `MSQDX_UI_REF` with the **code** SHA of this wave (not a later docs-only commit).

Grep in creation-v3 Dockerfile: `emptyLabel` · `fontPreview`.
