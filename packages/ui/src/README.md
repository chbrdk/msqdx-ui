# MSQ DX design system (product UI)

Internal tokens + CSS layers for ECHON web-ui. **No** `@msqdx/react` / MUI.

## Layout

```
apps/web-ui/src/design-system/
  index.ts
  tokens/          # brand, colors, spacing, radii, typography, roles
  css/             # tokens → base → ranked → components → briefing → frame → ultra-wide → chat
```

Entry: `apps/web-ui/src/index.css` `@import`s the CSS layers.

**Catalog:** Storybook — `pnpm storybook` · `knowledge/storybook-web-ui.md`

## Themes (`data-theme`)

| Id | Notes |
|----|--------|
| `msqdx` / `msqdx-dark` | Trial (default dark) |
| `msqdx-ui` / `msqdx-ui-dark` | Scale tokens + clearer surfaces |
| `forest` | Legacy; config-only |

Config: `web.ui.theme` / `web.ui.theme_choices` in `config/paths.yaml`. Default stays `msqdx-dark`.

## Scale tokens (CSS)

- `--space-1`…`--space-6` — 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 rem
- `--radius-sm|md|panel|pill|sheet`
- `--type-display|body|mono` (aliases → `--font-*` on themes)
- Motion: `--duration-*` / `--ease-*` / `--motion-*` · Button: `components/Button.tsx` · `knowledge/msqdx-ui-motion-buttons.md`
- Typography: `--type-*` / `--weight-*` / `--stack-*` · `<Text>` · Spec `specs/domain/msqdx-ui-typography.md` · `knowledge/msqdx-ui-typography.md`
- Chip: `<Chip>` · Spec `specs/domain/msqdx-ui-chip.md` · `knowledge/msqdx-ui-chip.md`
- Ranked list: `<RankedList>` / `<RankedRow>` · Spec `specs/domain/msqdx-ui-ranked-list.md` · `knowledge/msqdx-ui-ranked-list.md`
- Field: `<Field>` / `<Input>` / custom `<Select>` (no native OS dropdown) · Spec `specs/domain/msqdx-ui-field.md` · `knowledge/msqdx-ui-field.md`
- Foundation: Panel, MetricChip, PageTitle, Textarea, ToggleGroup, Hint, FilterRow, StatusDot, Alert, LoadingText/EmptyState · Spec `specs/domain/msqdx-ui-foundation.md` · `knowledge/msqdx-ui-completeness.md`
- Extended: Divider, Checkbox, Switch, Tabs, Skeleton, Spinner, Tooltip, Dialog · Spec `specs/domain/msqdx-ui-extended.md` · CSS `css/extended.css`
- Button: Spec `specs/domain/msqdx-ui-button.md` · `knowledge/msqdx-ui-motion-buttons.md`

Under v2, legacy `--radius` → `--radius-sm`. Panels use `--radius-panel`.

## Extend

1. Add TS values in `tokens/*.ts` (+ unit test).
2. Mirror CSS vars in `css/tokens.css` for the theme block(s).
3. Prefer `var(--space-*)` / `var(--radius-*)` in component CSS.
4. Charts: `chartTokensFor()` in `theme/msqdxTokens.ts` reads design-system colors.

## Links

- Map (pre-pass): `msqdx-ui-design-system-map.md`
- Trial themes: `ui-msqdx-trial.md`
- Paths: `urls-and-paths.md` · `config/paths.yaml` `brand.*` / `web.ui.*`
- ADR 0028 (amended for v2 theme ids)
