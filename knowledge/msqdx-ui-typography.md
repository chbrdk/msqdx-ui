# MSQ DX v2 — Typography

**Spec (SoT):** `specs/domain/msqdx-ui-typography.md`  
**Tokens:** `packages/ui/src/tokens/typography.ts`  
**CSS:** `design-system/css/tokens.css` (`--type-*`, `--weight-*`, `--track-*`, `--stack-*`) · `typography.css` (roles)  
**Component:** `<Text role="…">`  
**Storybook:** Design System → Typography

## Quick use

```tsx
import { Text } from '../design-system'

<Text role="title">Research</Text>
<Text role="hint">Click → /signals?category=policy</Text>
<Text role="body">Prose…</Text>
```

| Role | Intent |
|------|--------|
| `display` / `headline` / `title` | Page chrome display · **Signals/Briefing article titles** · section titles |
| `body` | Prose |
| `label` | Uppercase eyebrow |
| `meta` | Muted secondary |
| `hint` | Mono click-path (ADR 0028) |
| `mono` / `numeric` | Indices / tabular nums |

Button sizes bind to `--type-sm|md|lg`.

**Do not flatten:** `/signals/:id` and briefing heroes keep **large** headlines (`.signal-title` / `role="headline"` → `--type-display` + bold). Overview `.brand` uses `--type-brand`.

Briefing magazine page (`BriefingDetailPage`) uses `<Text>` / `<Button>` + tokenized `briefing.css`.

## Related

- ADR 0028 · `msqdx-ui-design-system.md` · `msqdx-ui-motion-buttons.md` · `storybook-web-ui.md`
