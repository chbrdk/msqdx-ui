# MSQDX UI — Lede / LedeStrip

**Status:** Accepted — 2026-08-03  
**Layer:** Molecules  
**Implements:** `packages/ui/src/components/Lede.tsx` · CSS `css/stat-lede.css`  
**Aliases:** `StatLede` / `StatLedeGroup` · `WizardSteps`

## Purpose

One magazine horizontal band language for:

1. **Metrics** — display numeral + uppercase label (wave rates, admin KPIs, Soft-Q)
2. **Steps** — numbered wizard indicator (create dialogs)

## API

### `Lede` (metric cell)

| Prop | Notes |
|------|--------|
| `value` / `unit` / `label` | Display stack |
| `tone` | `default` \| `pos` \| `low` \| `neg` \| `ok` \| `choice` |
| `kind` | `number` \| `text` \| `empty` |

### Token tones (P72)

| Tone | CSS | Brandion |
|------|-----|----------|
| pos / choice | `--accent` | `color.action.primary` |
| ok | `--ok` | `color.status.ok` |
| low | `--ink` / `--muted` | `color.ink` / `color.muted` |
| neg | mix `--ink` + `--danger` | `color.ink` + `color.status.danger` |

Hardcoded `#b33` is forbidden — use `--danger`.

### `LedeStrip`

| Prop | Notes |
|------|--------|
| `variant` | `metrics` (default) \| `steps` |
| `columns` | Metrics grid cols |
| `compact` | Smaller numerals |
| `steps` / `activeIndex` / `onStepSelect` | Steps mode |

## Acceptance

1. Storybook Metrics + Steps.  
2. Vitest covers both modes + aliases.  
3. Products migrate to `Lede` / `LedeStrip` (aliases OK during cutover).
