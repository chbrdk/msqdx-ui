# MSQ DX v2 design system (ECHON product UI) — 2026-07-28

Internal **tokens + CSS layers** under `packages/ui/src/`. No `@msqdx/react` / MUI.

## How to use

1. Prefer CSS vars: `--space-1…6`, `--radius-sm|md|panel|pill|sheet`, semantic `--bg0` / `--accent` / roles.
2. Charts/status: `chartTokensFor()` / `statusColorsFor()` from `theme/msqdxTokens.ts` (reads `design-system/tokens`).
3. Themes via `data-theme` + `ThemeToggle` / `web.ui.theme_choices`.

## Themes

| Id | Role |
|----|------|
| `msqdx` / `msqdx-dark` | Trial (default dark) |
| `msqdx-ui` / `msqdx-ui-dark` | Scale + clearer surfaces |
| `forest` | Legacy; not in default choices |

Default remains **`msqdx-dark`** until explicitly switched.

## Link map

| What | Where |
|------|--------|
| Design-system root | `packages/ui/src/` |
| CSS entry | `apps/web-ui/src/index.css` → `@import` layers |
| Token TS | `design-system/tokens/*.ts` |
| Theme runtime | `theme/msqdxTokens.ts`, `ThemeContext.tsx`, `ThemeToggle.tsx` |
| Config | `config/paths.yaml` → `web.ui.theme*` · `brand.*` |
| Sync Vite env | `scripts/sync_web_env.py` |
| Pre-pass map | `msqdx-ui-design-system-map.md` |
| Trial notes | `ui-msqdx-trial.md` |
| Paths index | `urls-and-paths.md` |
| ADR | `specs/adr/0028-product-ui-visual-system.md` |

## Extend tokens

See `packages/ui/src/README.md`.

## Storybook

Component catalog: `knowledge/storybook-web-ui.md` · `pnpm storybook` in `apps/web-ui` · URL from `web.storybook_base_url`.

Motion + Button: `knowledge/msqdx-ui-motion-buttons.md`.  
Typography: `specs/domain/msqdx-ui-typography.md` · `knowledge/msqdx-ui-typography.md`.  
**Atomic Storybook:** `specs/domain/msqdx-ui-storybook-atomic.md` · `knowledge/msqdx-ui-storybook-atomic.md` · catalog `apps/web-ui/src/storybook/catalog.ts`.  
**Responsive ladder:** `specs/domain/msqdx-ui-responsive.md` · `knowledge/msqdx-ui-responsive.md` · `responsive.css` · `web.ui.responsive_*`.  
Chip/Filter: `specs/domain/msqdx-ui-chip.md` · `knowledge/msqdx-ui-chip.md` (pilot: `/signals`, Waves/Sources).  
Ranked list: `specs/domain/msqdx-ui-ranked-list.md` · `knowledge/msqdx-ui-ranked-list.md` (pilot: `CategoryBars`).  
Field: `specs/domain/msqdx-ui-field.md` · `knowledge/msqdx-ui-field.md` (custom Select listbox — no OS dropdown; pilot: Signals/Waves/Sources).  
SectionChrome: `specs/domain/msqdx-ui-section-chrome.md` · `knowledge/msqdx-ui-section-chrome.md`.  
**Completeness / foundation bar:** `knowledge/msqdx-ui-completeness.md` · `specs/domain/msqdx-ui-foundation.md` · Button: `specs/domain/msqdx-ui-button.md`.  
**Product SoT (build with DS):** `knowledge/msqdx-ui-product-sot.md` (Waves A–E).  
**Token SoT:** `design-system/tokens/*` · runtime facade `theme/msqdxTokens.ts` · guard `tokenSot.test.ts`.  
**Feedback/data:** `specs/domain/msqdx-ui-feedback-data.md` · `knowledge/msqdx-ui-feedback-data.md`.  
Signal detail parity: `specs/domain/msqdx-ui-signal-detail.md` · `knowledge/msqdx-ui-signal-detail.md`.  
Chat chrome: `specs/domain/msqdx-ui-chat-chrome.md` · `knowledge/msqdx-ui-chat-chrome.md`.
