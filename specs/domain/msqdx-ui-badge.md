# MSQDX UI — Badge

**Status:** Accepted — 2026-08-14 (P72 token aliases)  
**Layer:** Atoms  
**Implements:** `packages/ui/src/components/Badge.tsx` · CSS `.ds-badge*` in `css/components.css`

## Purpose

Compact status / category chip for lists and inspect chrome.

## API

| Prop | Notes |
|------|--------|
| `tone` | `neutral` \| `accent` \| `success` \| `warning` \| `danger` |
| `children` | Label |

## Token dependencies (P72 / W-CHROME-TONES)

| Tone | CSS var | Layer 0 | Brandion path |
|------|---------|---------|---------------|
| accent | `--accent` | accent | `color.action.primary` |
| success | `--success` → `--ok` | ok | `color.status.ok` |
| warning | `--warning` → `--warn` | warn | `color.status.warn` |
| danger | `--danger` | danger | `color.status.danger` |
| neutral | `--border` / `--fg` | line / ink | `color.line` / `color.ink` |

`--success` / `--warning` are **CSS aliases** of `--ok` / `--warn` (declared in `tokens.css`). No Brandion enum leaves.

## Acceptance

1. Storybook stories cover tones.
2. Unit tests cover the key behavior.
3. Consuming apps import `Badge` from `@msqdx/ui`.
4. D5/D5b semantic map cites the paths above.
