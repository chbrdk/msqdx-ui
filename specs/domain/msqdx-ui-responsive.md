# MSQ DX v2 — Responsive ladder (ECHON product UI)

**Status:** Accepted — 2026-07-28  
**ADR:** 0028 §22  
**Knowledge:** `knowledge/msqdx-ui-responsive.md`  
**SoT knobs:** `web.ui.responsive_*` in `config/paths.yaml`  
**CSS:** `packages/ui/src/css/responsive.css` (via `index.css`)  
**Complements:** Ultra-wide ladder (`web.ui.ultra_wide_*` · `knowledge/overview-ultra-wide.md`)

## Goals

1. Systematize **narrow → desktop** behaviour for Atomic layers (Atoms → Pages).
2. Keep **workstation-first** product; phone/tablet must be usable, not a separate mobile app.
3. Breakpoint literals in CSS match `paths.yaml` defaults (guarded by tests).
4. Storybook viewport presets read from `paths.responsive*` / `paths.ultraWide*`.

## Non-goals

- Chromatic / visual regression CI.
- Native bottom-tab mobile chrome.
- Changing ultra-wide band rules.

## Breakpoint ladder

| Token | Default | CSS role |
|-------|---------|----------|
| `responsive_sm_max_px` | 640 | Phone / eng — `@media (max-width: 640px)` |
| `responsive_md_max_px` | 900 | Tablet — `@media (max-width: 900px)` (aligns legacy 900px) |
| `responsive_lg_min_px` | 1200 | Comfortable desktop before ultra-wide |

Then ultra-wide from 1600px upward (unchanged).

Synced → `VITE_RESPONSIVE_*` · `paths.responsiveSmMaxPx` / `responsiveMdMaxPx` / `responsiveLgMinPx`.

## Layer rules

| Layer | Behaviour |
|-------|-----------|
| Atoms | `max-width: 100%`; `min-width: 0`; no forced overflow |
| Molecules | Field `inline` → column ≤ md; FilterRow wrap; ranked tracks full width |
| Organisms | Multi-col grids → 1-col ≤ md; dialogs `min(…, 100vw - gutter)` |
| Templates | Topbar wrap; chat overlay full-bleed ≤ sm; rail remains dockable |
| Pages | Filter strips stack ≤ md; detail shells keep max-width |

## Storybook

Viewport toolbar presets: `responsiveSm`, `responsiveMd`, `desktop`, `ultraWide` (sizes from paths).  
Critical entries set `parameters.viewport` or document in MDX (`viewportCritical` in `catalog.ts`).

## Acceptance

1. Spec + knowledge + ADR §22.  
2. Knobs in paths.yaml · sync · paths.ts defaults.  
3. `responsive.css` imported; literals match defaults.  
4. `responsiveLayout.test.ts` + paths tests green.  
5. Completeness marks Responsive bar done.
