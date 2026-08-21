# BrandCorner hover expand (2026-08-21)

**Behavior:** Default plaque is mark-only. On hover/focus the product label expands **left** (right-anchored).

**CSS:** `grid-template-columns: 0fr → 1fr` on `.brand-corner-reveal`; `pointer-events: auto` on `.brand-corner-box`.

**Opt-out:** `labelReveal="always"` or `showLogo={false}` (label-only plaque).

**Apps:** No per-app UI change — consume via `@msqdx/ui` / `MSQDX_UI_REF` pin bump.
