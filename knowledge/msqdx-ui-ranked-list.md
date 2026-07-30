# MSQ DX v2 — Ranked list

**Spec:** `specs/domain/msqdx-ui-ranked-list.md`  
**Component:** `<RankedList>` / `<RankedRow>` · `formatRankIndex` · CSS `design-system/css/ranked.css`  
**Storybook:** Design System → RankedList  
**Pilot:** `CategoryBars` (Overview) · Waves category filters → `<Chip>`

```tsx
import { RankedList, RankedRow, Text } from '../design-system'

<RankedList hint={<Text role="hint">n=30 · click → Signals</Text>}>
  <RankedRow
    index={1}
    label="MARKET"
    value={20}
    secondary="50%"
    barPct={100}
    onActivate={() => navigate(signalsListHref({ category: 'MARKET' }))}
  />
</RankedList>
```

Legacy `.category-rank*` classes remain dual aliases on the same nodes.

## Related

- `category-rank-viz.md` · ADR 0028 §10 · `storybook-web-ui.md` · Chip: `msqdx-ui-chip.md`
