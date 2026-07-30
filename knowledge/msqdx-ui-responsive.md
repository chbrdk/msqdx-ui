# MSQ DX v2 — Responsive (2026-07-28)

Narrow → desktop ladder for product UI. Complements ultra-wide Overview.

**Spec:** `specs/domain/msqdx-ui-responsive.md`  
**Knobs:** `web.ui.responsive_sm_max_px` (640) · `responsive_md_max_px` (900) · `responsive_lg_min_px` (1200)  
**CSS:** `packages/ui/src/css/responsive.css`  
**App paths:** `paths.responsiveSmMaxPx` / `responsiveMdMaxPx` / `responsiveLgMinPx`

## Ladder

`sm ≤640` → `md ≤900` → `lg ≥1200` → `ultra_wide ≥1600…`

## Storybook

Viewport toolbar presets from paths (see `.storybook/preview.tsx`).

## Related

- Ultra-wide: `overview-ultra-wide.md`
- Atomic catalog: `msqdx-ui-storybook-atomic.md`
- ADR 0028 §22
