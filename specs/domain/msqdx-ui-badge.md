# MSQDX UI — Badge

**Status:** Accepted — 2026-08-14 (P72 token aliases)  
**Layer:** Atoms  
**Implements:** `packages/ui/src/components/Badge.tsx` · CSS `.ds-badge*` in `css/components.css`

## Purpose

Compact **status / category** label for lists, cards, and inspect chrome.
Not a filter control — filters stay on `Chip` (`msqdx-ui-chip.md`).

## Goals

1. Status differences MUST be readable at a glance via tone fill + border + ink (not only a tiny StatusDot).
2. Tones map to Layer 0 status tokens (`--ok` / `--warn` / `--danger` / `--accent` / muted).
3. Apps MUST prefer `Badge` for lifecycle / analysis / pipeline status labels.

## Non-goals

- Interactive filter toggles (`Chip`).
- Replacing `StatusDot` in dense chrome where a one-pixel health cue is enough (editor strip).

## API

| Prop | Notes |
|------|--------|
| `tone` | `neutral` \| `accent` \| `success` \| `warning` \| `danger` (default `neutral`) |
| `children` | Label |

## Token dependencies (P72 / W-CHROME-TONES)

| Tone | CSS var | Layer 0 | Brandion path |
|------|---------|---------|---------------|
| accent | `--accent` | accent | `color.action.primary` |
| success | `--success` → `--ok` | ok | `color.status.ok` |
| warning | `--warning` → `--warn` | warn | `color.status.warn` |
| danger | `--danger` | danger | `color.status.danger` |
| neutral | `--muted` / `--line` | muted / line | `color.muted` / `color.line` |

`--success` / `--warning` are **CSS aliases** of `--ok` / `--warn` (declared in `tokens.css`). No Brandion enum leaves.

## CSS contract

- Public: `.ds-badge`, `.ds-badge--neutral` (default face), `.ds-badge--accent|success|warning|danger`
- Each tone uses tinted background + matching border/ink so statuses stay distinguishable without an adjacent StatusDot

## Acceptance

1. Storybook stories cover all tones.
2. Unit tests assert tone class names.
3. Consuming apps import `Badge` from `@msqdx/ui` for status labels.
4. D5/D5b semantic map cites the paths above.
