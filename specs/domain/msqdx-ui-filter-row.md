# MSQDX UI — FilterRow

**Status:** Accepted — foundation · Magazine overhaul 2026-08-03  
**Layer:** Molecules  
**Implements:** `FilterRow.tsx` · CSS `.ds-filter-row*`

## Purpose

Chip / filter band for magazine surfaces (severity, capability, sort). Prefer `Chip` children with selected state — not filled toggle strips.

## API

| Prop | Default | Notes |
|------|---------|--------|
| `variant` | `magazine` | Hairline bottom band + roomy gap |
| `variant="toolbar"` | | Compact ops wrap |
| `label` | — | Optional uppercase eyebrow |

## Do

- Use for interactive filter groups (CHECKION severity / capability).
- Prefer magazine default on editorial pages.

## Don't

- Giant chip walls of full catalogs.
- Decorative cover tag rows that are not filters (keep product `chip-row` if needed).
