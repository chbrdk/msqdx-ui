# Inspect chrome follows MSQDX light/dark tokens

**Date:** 2026-08-12  
**Spec:** `specs/domain/msqdx-ui-creation-editor-chrome.md` · `msqdx-ui-token-picker.md`  
**Consumer:** creation-v3 `/editor` (default `data-theme=msqdx-dark`)

## Why

Editor chrome used `--surface-1` and `--border`, which were **never defined** on themes. CSS fell through to `#fff` / `rgba(0,0,0,0.12)`. TokenPicker wells used `--surface-2` (`#f7f7f7` fallback). In dark that is a wall of grey boxes, not magazine Field language.

Magazine Input (`field.css`) is: transparent fill, `--ink` hairline + firm bottom rule, value `--ink`, placeholder `--muted`.

## What landed

| Token | Role |
|-------|------|
| `--bg0` | Canvas well / editor body pit |
| `--bg1` | Rails, inspector, layers, toolbar |
| `--ink` | Values, selected chrome |
| `--muted` | Labels, empty `—` |
| `--line` | Hairlines |
| `--field` | Magazine input fill (light `#fff`, dark ink 7% on `--bg1`) |
| `--surface-1` | Alias of `--bg1` (legacy class names) |
| `--border` | Alias of `--line` |

TokenPicker current strip matches Input (transparent + ink rule). Artboard page fill stays `#fff` so a light composition still reads on a dark editor.

## Pin

Grep `packages/ui/src/css/tokens.css` for `--surface-1: var(--bg1)`.
