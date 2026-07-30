# MSQ DX v2 — Ranked list (product UI)

**Status:** Accepted — 2026-07-28  
**ADR:** 0028 §10 (ranked visual language)  
**Implements:** `packages/ui/src/components/RankedList.tsx` · `css/ranked.css` (`.ds-rank*`)  
**Knowledge:** `knowledge/msqdx-ui-ranked-list.md` · `category-rank-viz.md`  
**Catalog:** Storybook → Organisms/RankedList · RankedList.mdx  
**Pilot:** `CategoryBars` (Overview); Waves category filters → `<Chip>` in same pass

## Goals

1. One ranked-row primitive matching ADR 0028: mono index `01…`, label, tabular meta, thin track.
2. Tokens only: type (`--type-xs` index / `--type-lg` label), space (`--space-*` gaps), radius, `--track`, `--motion-hover`.
3. Spec → components → CSS aliases → Storybook → CategoryBars pilot → tests.

## Non-goals

- Rewrite every ranked consumer (SignalCompactList, citations, score bars) in this pass.
- Chart/Recharts rankings (already retired for categories).
- Drag-reorder / virtualization.

## Anatomy

| Part | Class | Tokens |
|------|-------|--------|
| List | `.ds-rank` (+ legacy `.category-rank`) | column · gap `--space-3` |
| Row | `.ds-rank-row` | grid `1.5rem 1fr` · hover wash · `--motion-hover` |
| Index | `.ds-rank-idx` | mono · `--type-xs` · `--track-meta` · muted |
| Label | `.ds-rank-label` | body · `--type-lg` · weight medium |
| Meta value | `.ds-rank-value` | tabular · `--type-md` · weight semibold |
| Meta secondary | `.ds-rank-meta-sec` | `--type-2xs` · muted |
| Track | `.ds-rank-track` / `.ds-rank-fill` | height `--space-1` · pill · accent fill |

## API

```tsx
<RankedList
  hint={<Text role="hint">{t('overview.categoriesHint', { n })}</Text>}
>
  {rows.map((row, i) => (
    <RankedRow
      key={row.category}
      index={i + 1}
      label={row.category}
      value={row.count}
      secondary={`${share}%`}
      barPct={barPct}
      onActivate={() => navigate(…)}
    />
  ))}
</RankedList>
```

| Prop (RankedRow) | Notes |
|------------------|--------|
| `index` | 1-based; rendered zero-padded |
| `label` | Primary text |
| `value` | Strong tabular (count / score) |
| `secondary` | Optional muted meta (`42%`) |
| `barPct` | 0–100; omit = no track |
| `onActivate` | Click + Enter/Space; omit = static row |

## Acceptance

1. Spec linked from ADR 0028 / knowledge / Storybook.
2. `CategoryBars` uses `RankedList` / `RankedRow` (no hand-rolled row markup).
3. Unit tests: index padding, activate callback, track width style.
4. Legacy `.category-rank*` classes still apply (aliases) for any leftover CSS.

## Migration

- Next: SignalCompactList, CitationScoreBars, Scenario Δ rows.
- Waves/Sources filters: `<Chip>` (same pass as convenience).
