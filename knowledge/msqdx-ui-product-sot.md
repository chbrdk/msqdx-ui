# MSQ DX v2 — Product UI single source of truth (2026-07-28)

Rules for building ECHON product UI from the design system — not ad-hoc markup.

## SoT map

| Concern | Source of truth |
|---------|-----------------|
| URLs, ports, breakpoints, knobs | `config/paths.yaml` → sync → `apps/web-ui/src/config/paths.ts` |
| Visual primitives | `packages/ui/src/` (components + `css/*` + `tokens/*`) |
| Specs | `specs/domain/msqdx-ui-*.md` |
| Inventory / Storybook | `apps/web-ui/src/storybook/catalog.ts` |
| Completeness bar | `knowledge/msqdx-ui-completeness.md` |

**Do not** invent rem/weight/color literals in page JSX or one-off classnames when a DS primitive exists.

## Build rules (binding)

1. **Import chrome from** `design-system` barrel (`Button`, `Field`, `Text`, `Panel`, …) — not raw `<button class="ghost-btn">` / `<input class="search-input">` for new or migrated paths.
2. **Selects** = custom `<Select>` (never native OS `<select>` for filters).
3. **Default control size** = `sm` unless density needs `md`.
4. **Layout breakpoints** = `web.ui.responsive_*` / `ultra_wide_*` only — no hardcoding 640/900/1600 in components.
5. **Pages compose** Atoms → Molecules → Organisms; domain viz stays in `viz/` but shells use `<Panel>` / `<SectionChrome>` / `<Text>`.
6. **Storybook** entry required when adding a public primitive; product pages stay in `Pages/*` catalog.

## Cutover waves (product)

| Wave | Scope | Status |
|------|--------|--------|
| A | Foundation + Extended primitives + Atomic catalog + Responsive | Done |
| B | Chat chrome (composer / overlay / open surface) | Done |
| C | Remaining page chrome (`h2` titles → `Text`/`PageTitle`, status → Alert/LoadingText, cite → Button) | Done |
| D | Token unify (`msqdxTokens.ts` ↔ DS tokens) for charts + CSS palette sync | Done |
| E | Toast / DataTable / Avatar | Done |

**Allowed exceptions:** Chat overlay backdrop remains a native full-bleed scrim `<button class="chat-overlay-backdrop">` (not DS Button chrome).

**Wave D SoT:** Palette/chart/status live in `design-system/tokens/*`. `theme/msqdxTokens.ts` is runtime (theme id + `data-theme` + `chartTokensFor` / `statusColorsFor`). Guard: `tokenSot.test.ts`.

**Wave E:** `Avatar` · `ToastProvider`/`useToast` · `DataTable` — `msqdx-ui-feedback-data.md`.  
**Product consumers:** `/sources` (DataTable + Avatar + Toast); Waves detect → Toast; OpsStrip error/loading → Alert/LoadingText; Research/Signals/Waves empties → EmptyState; Overview KPI → LoadingText/Text; scenario hint → Hint; SystemLoad meta → Text.

**Settings:** Theme/Locale moved from topbar → `/settings` (rail Avatar). See `msqdx-ui-settings.md`.

## Related

- Hub: `msqdx-ui-design-system.md`
- Chat: `msqdx-ui-chat-chrome.md`
- Responsive: `msqdx-ui-responsive.md`
- ADR 0028
